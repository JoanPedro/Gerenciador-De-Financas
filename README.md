# Gerenciador-De-Financas
Gerenciador de finanças.

1. Para Criação do Container, no terminal (Linux): docker-compose up -d 
2. Geração do Prisma-Client, no terminal (Linux): prisma generate
  - Por estar utilizando a variante do Prisma; Binding, o mesmo não possui suporte para funções de agregação SQL além do COUNT, desta forma, foi-se necessário a implementação via Prisma variante Client para suporte da funcionalidade de Somar Saldo do Usuário até a data atual.
3. Para Desenvolvimento, no terminal (Linux): sudo docker-compose up
