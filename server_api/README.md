#Tạo database với tên reipa_db
#Chạy dòng script sau trong query tool của database
CREATE EXTENSION postgis;

#run create table
cd server_api/src
npx sequelize-cli db:migrate

#run seeder all file
npx sequelize-cli db:seed:all

#run seeder one file
npx sequelize db:seed --seed name.js