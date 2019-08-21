# Isomorphic - React Redux Admin Dashboard `Version 2.9.4`


**1.1. Instalación de Yarn**

    cd ~
    curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
 
    sudo apt update
    sudo apt install yarn
 
 **1.2. Instalación de Nginx**
 
    sudo apt-get install nginx
    sudo ufw allow 'Nginx HTTP' (para HTTP)
    sudo ufw allow 'Nginx HTTPS' (para HTTPS)
 **2. Clonar repositorio en /var/www/**
 
 **3. Configurar proyecto**
 
 3.1 Acceder a la carpeta del proyecto
 3.2 Ejecutar
    
    yarn && yarn build
    
 
3.4 Configurar Nginx

    sudo nano /etc/nginx/sites-available/cargapp-server
    
    copiar
    
    server {
            listen 80;
    
            root /var/www/cargapp_admin/build;
            index index.html index.htm index.nginx-debian.html;
    
            server_name your_server_ip_or_domain;
    
            location / {
                    try_files $uri /index.html;
            }
    }
    
    reemplazando your_server_ip_or_domain por ip o dominio del servidor
    
3.5 Crear link simbolico de Nginx

    sudo ln -s /etc/nginx/sites-available/cargapp-server /etc/nginx/sites-enabled/cargapp-server

3.6 Reset NGINX 
    
    sudo systemctl restart nginx


Con lo anterior ya el proyecto esta arriba, si desea habilitar despliegues automaticos por github, realize lo siguiente

4.1. Instale y configure Webhooks
    
    
    cd ~
    wget https://github.com/adnanh/webhook/releases/download/2.6.6/webhook-linux-amd64.tar.gz
    tar -xvf webhook-linux-amd64.tar.gz
    sudo mv webhook-linux-amd64/webhook /usr/local/bin
    rm -rf webhook-linux-amd64*
    sudo mkdir /opt/scripts
    sudo mkdir /opt/hooks
    
    sudo chown -R $USER:$USER /opt/scripts
    sudo chown -R $USER:$USER /opt/hooks
    nano /opt/hooks/hooks.json
    
   En el archivo creado copiar lo siguiente, donde your-github-secret es una clave secreta para configurar con github
   
    [
      {
        "id": "redeploy-app",
        "execute-command": "/opt/scripts/redeploy.sh",
        "command-working-directory": "/opt/scripts",
        "pass-arguments-to-command":
        [
          {
            "source": "payload",  
            "name": "head_commit.message"
          },
          {
            "source": "payload",
            "name": "pusher.name"
          },
          {
            "source": "payload",
            "name": "head_commit.id"
          }
        ],
        "trigger-rule":
        {
          "and":
          [
            {
              "match":
              {
                "type": "payload-hash-sha1",
                "secret": "your-github-secret", 
                "parameter":
                {
                  "source": "header",
                  "name": "X-Hub-Signature"
                }
              }
            },
            {
              "match":
              {
                "type": "value",
                "value": "refs/heads/master",
                "parameter":
                {
                  "source": "payload",
                  "name": "ref"
                }
              }
            }
      }
    ]
    
Luego habilitar el puerto 9000

    sudo ufw allow 9000


5.1. Configure las notificaciones de github
1. Ir al repositorio y oprimir en configuraciones
2. Ir a webhooks y añadir webhooks
3. En el payload URL poner http://your_server_ip:9000/hooks/redeploy-app y en el secreto, el puesto en el documento anterior
4. En Content type poner application/json
5. En los eventos poner la opcion solo el evento push
6. Click en añadir

5.1 Escribir el script 

    nano /opt/scripts/redeploy.sh

con

    #!/bin/bash -e
    
    function cleanup {
          echo "Error occoured"
          # !!Placeholder for Slack notification
    }
    trap cleanup ERR
    
    commit_message=$1 # head_commit.message
    pusher_name=$2 # pusher.name
    commit_id=$3 # head_commit.id
    
    # !!Placeholder for Slack notification
    
    cd ~/do-react-example-app/
    git pull origin master
    yarn && yarn build
    
    # !!Placeholder for Slack notification
    
    
5.2 Hacer el script ejecutable

    chmod +x /opt/scripts/redeploy.sh
    
5.3 Ejecutar el webhook

    cd /etc/systemd/system
    nano webhook.service
    
Añadir

    [Unit]
    Description=Webhooks
    
    [Service]
    ExecStart=/usr/local/bin/webhook -hooks /opt/hooks/hooks.json -hotreload
    
    [Install]
    WantedBy=multi-user.target
    
    
    
    
Ejecutar 

    systemctl enable webhook.service
    
    systemctl start webhook.service
    
Para comprobar servicio

    service webhook status