import paramiko, os

host = '104.247.173.45'
user = 'root'
pwd = '3I4Me62m6jgIPqo3BF'
remote_base = '/var/www/www-root/data/www/www.bkdrilling.com'
local_base = r'C:\Users\berka\Desktop\projects\bk_drilling_web\out'

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(host, port=22, username=user, password=pwd, timeout=60, allow_agent=False, look_for_keys=False)
sftp = ssh.open_sftp()
print('Connected!')

count = 0
for root, dirs, files in os.walk(local_base):
    rel = os.path.relpath(root, local_base).replace(os.sep, '/')
    remote_dir = remote_base if rel == '.' else remote_base + '/' + rel
    # ensure remote dir exists
    try:
        sftp.stat(remote_dir)
    except:
        parts = remote_dir.split('/')
        for i in range(1, len(parts) + 1):
            p = '/'.join(parts[:i])
            if not p:
                continue
            try:
                sftp.stat(p)
            except:
                try:
                    sftp.mkdir(p)
                except:
                    pass
    for f in files:
        local_path = os.path.join(root, f)
        remote_path = remote_dir + '/' + f
        sftp.put(local_path, remote_path)
        count += 1
        if count % 10 == 0:
            print(f'  Uploaded {count} files...')

print(f'Done! Total: {count} files uploaded.')
sftp.close()

# Fix permissions
stdin, stdout, stderr = ssh.exec_command(
    f'chown -R www-root:www-root {remote_base} && chmod -R 755 {remote_base}'
)
stdout.read()
print('Permissions set.')
ssh.close()
print('Deployment complete!')
