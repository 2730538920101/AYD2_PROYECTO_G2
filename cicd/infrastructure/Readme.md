[REGRESAR](../../README.md)

## Para inicializar el cluster de kubernetes y conectarse con kubectl

aws eks update-kubeconfig --name jenkins-cluster


## Para crear el keypair de los worker nodes

ssh-keygen -t rsa -b 4096 -f eks-cluster-key


[REGRESAR](../../README.md)


