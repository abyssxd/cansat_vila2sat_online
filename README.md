# cansat_vila2sat_online
A online hosted verison of the [Vila2Sat Dashboard](https://github.com/abyssxd/cansat_vila2sat) that uses mysql database instead of nodejs.

## Configuring
The database connection file is `/database/db_connection.php`, you need to change this to your own database where the data is saved by the Vila2Sat Serial Monitor or any other program, make sure the database structure and the way the data is read by this matches, by default this uses the database structure created by the [Vila2Sat Serial Moitor](https://github.com/abyssxd/vila2sat_serial)

## License
Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
