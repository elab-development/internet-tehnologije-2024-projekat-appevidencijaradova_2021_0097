Dockerizovano pokretanje aplikacije
1. Pokretanje Docker kontejnera

docker compose up -d --build

2. Ako je prvi put pokrenuta baza, migracija i Passport setup

docker compose exec laravel bash
php artisan migrate
php artisan passport:install

3. Frontend React se automatski pokreće u development režimu

Dostupno na http://localhost:3000

4. Stopiranje i restartovanje kontejnera

Pokretanje nakon inicijalnog build-a docker compose up

Stopiranje kontejnera: docker compose down

Restart bez gubljenja podataka: docker compose up -d

Brisanje svih podataka (volume): docker compose down -v