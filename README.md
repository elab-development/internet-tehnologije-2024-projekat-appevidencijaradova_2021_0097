Početna podešavanja pre pokretanja projekta
1. Kloniranje repozitorijuma

git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-appevidencijaradova_2021_0097

2. Ulazak u direktorijum projekta

cd internet-tehnologije-2024-projekat-appevidencijaradova_2021_0097

Lokalno pokretanje aplikacije
3. Instalacija Composera za Laravel

cd laravel
composer install

3.1. U slučaju greške, omogućiti ekstenzije u php.ini fajlu

;extension=sodium => extension=sodium

4. Kopiranje .env fajla

cp .env.example .env

5. Generisanje enkripcionih ključeva

php artisan key:generate

6. Kreiranje prazne baze podataka

Kreirajte praznu bazu podataka za projekat na phpMyAdmin-u sa imenom iz .env fajla

7. Migracija i popunjavanje baze podataka

php artisan migrate
php artisan db:seed

8. Instalacija Laravel Passport zavisnosti

php artisan passport:install

9. Instalacija NPM zavisnosti za frontend

cd ../react-frontend
npm install

10. Pokretanje aplikacije

Pokretanje Laravel servera iz laravel foldera
php artisan serve

Pokretanje React servera iz react foldera
npm start