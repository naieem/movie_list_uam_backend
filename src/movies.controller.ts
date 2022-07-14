import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Movie } from './dbmodule/interfaces/movie.interface';
import { ErrorException } from './utils/error.interception';

@Controller('movies')
export class MoviesController {
  private movieList: Movie[] = [
    {
      Title: 'Agir abi',
      Year: '2011',
      imdbID: 'tt1909726',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BN2I4MjBhMDgtMjQ4NC00NWIzLWE3OGYtMjNkMDQ3OTcwMmNhXkEyXkFqcGdeQXVyMjc0MjUzMzU@._V1_SX300.jpg',
    },
    {
      Title: 'Abi foq al-Shagara',
      Year: '1969',
      imdbID: 'tt0251881',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNDU5NjUwNzUtNjc3OS00ODI4LTkxNzYtMzRiYjczOTQ2YzMyXkEyXkFqcGdeQXVyMzI4MTk3MTY@._V1_SX300.jpg',
    },
    {
      Title: 'Bayram Abi',
      Year: '2016',
      imdbID: 'tt6133048',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2QzMzY3ZmYtMTU5ZS00MmJhLThiMjctZmVhNmNkNmQ4ZDM4XkEyXkFqcGdeQXVyMjQzMDU1Njc@._V1_SX300.jpg',
    },
    {
      Title: 'Gülsen Abi',
      Year: '1994',
      imdbID: 'tt4611650',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMmJkMWI1OGEtZDFjMC00NTE2LTlkOTYtZTI5NDE2MDczMDM4XkEyXkFqcGdeQXVyMTEzMTM0MDky._V1_SX300.jpg',
    },
    {
      Title: "Abi '97 - gefühlt wie damals",
      Year: '2017',
      imdbID: 'tt6985072',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZmU0ODA5NjktZmFjMi00ODQ5LTg0OGQtNjdjOWRlZmNjNzE1XkEyXkFqcGdeQXVyMzYwMTkzNTQ@._V1_SX300.jpg',
    },
    {
      Title: 'Helal Olsun Ali Abi',
      Year: '1963',
      imdbID: 'tt0388104',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BODFhOWU3YjQtNmU5OS00MWY2LWE1ZjMtZDFjNzcxMjI2MjRmXkEyXkFqcGdeQXVyNDA0NjY3Mzc@._V1_SX300.jpg',
    },
    {
      Title: 'Hadret Al Motaham Abi',
      Year: '2006',
      imdbID: 'tt8170370',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDMwZTc1N2EtZTViMC00OTYzLWIxNjQtMzc4ZTZmY2NmZjE1XkEyXkFqcGdeQXVyMTU0NTQyMjk@._V1_SX300.jpg',
    },
    {
      Title: 'Abi',
      Year: '2019',
      imdbID: 'tt10110672',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDJmNTNiOWUtYmVkNS00ZWY1LTk1YzMtMmQ5MDZmZDJlMjlkXkEyXkFqcGdeQXVyNDA2NjEzNg@@._V1_SX300.jpg',
    },
    {
      Title: 'Abi be range aseman',
      Year: '2019',
      imdbID: 'tt11111166',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZGZlNWIzNjEtZDQzZS00NDJjLWEwOGQtOTZlYmZjM2YyMjljXkEyXkFqcGdeQXVyOTM3NzEyMzU@._V1_SX300.jpg',
    },
    {
      Title: 'Abi va Rabi',
      Year: '1930',
      imdbID: 'tt0171045',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMmExZjQ2NmQtMTg0Ny00OWUxLWFjNjAtOGI1MGI2N2Q5ZGRiXkEyXkFqcGdeQXVyNjc0MDM2NzE@._V1_SX300.jpg',
    },
    {
      Title: 'Haza ganahu abi',
      Year: '1945',
      imdbID: 'tt0266616',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOGFjNGY2NWUtZTBkMy00YTUzLWEyOTMtYWJkZDI5MWZjMjFjXkEyXkFqcGdeQXVyMzI4MTk3MTY@._V1_SX300.jpg',
    },
    {
      Title: 'Khadaini abi',
      Year: '1951',
      imdbID: 'tt0311395',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTM1ODZkMzAtOTA5NC00OGQ3LTkxNGItMWI2MTVjZjJiYmZlXkEyXkFqcGdeQXVyMzI4MTk3MTY@._V1_SX300.jpg',
    },
    {
      Title: 'Abi Titmuss: A Modern Day Morality Tale',
      Year: '2005',
      imdbID: 'tt0462170',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Sen Neymissin Be Abi...',
      Year: '1986',
      imdbID: 'tt5622910',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Abi',
      Year: '2008-2009',
      imdbID: 'tt1691159',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNmJhOTdhZmQtMjUzZS00N2FlLTljMjItYTI1OGRjZmQ4OTUwXkEyXkFqcGdeQXVyMTAyODU4MzA@._V1_SX300.jpg',
    },
    {
      Title: 'Tone & Tease with Abi Titmuss',
      Year: '2005',
      imdbID: 'tt0442520',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjI4NTQzNjUxNV5BMl5BanBnXkFtZTcwMzU1NTcyMQ@@._V1_SX300.jpg',
    },
    {
      Title: 'Bana abi de',
      Year: '2002',
      imdbID: 'tt0448272',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Das kalte Abi',
      Year: '2009',
      imdbID: 'tt1496382',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Abi II',
      Year: '2010',
      imdbID: 'tt2248124',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Abi youchbeh Abdel Nasser',
      Year: '2012',
      imdbID: 'tt2577724',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'ABI: Home',
      Year: '2013',
      imdbID: 'tt3416452',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZjNjNjYxMjEtYTFlYy00MjZkLThmOGMtOTUyZjUzNjU4YWI0XkEyXkFqcGdeQXVyNzA5MzMzNjk@._V1_SX300.jpg',
    },
    {
      Title: 'Abi Means Papa',
      Year: '2014',
      imdbID: 'tt3743138',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'The Esther & Abi Ofarim Show',
      Year: '1968-',
      imdbID: 'tt4165440',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Yetis abi',
      Year: '2015',
      imdbID: 'tt4200662',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kâmil Abi',
      Year: '1963',
      imdbID: 'tt0388166',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Bitirimsin abi',
      Year: '1967',
      imdbID: 'tt0429681',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kabilni ya abi',
      Year: '1947',
      imdbID: 'tt0297222',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Abi Feijó',
      Year: '1997',
      imdbID: 'tt0135119',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Abi Ghermez',
      Year: '2020',
      imdbID: 'tt13979044',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BOGNjZTUwMGUtZWJiZS00Y2QyLTgwMmMtNmU2YmU3Nzg3MTliXkEyXkFqcGdeQXVyMTI5MTIyMDI4._V1_SX300.jpg',
    },
    {
      Title: 'Abi-Hayat-The fountain of life',
      Year: '2008',
      imdbID: 'tt14416724',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjA3MzA4YzAtYjBmYy00NDZmLWFkN2YtOGNlMDUxMTM0ZmRjXkEyXkFqcGdeQXVyMTIzMjk2MDg3._V1_SX300.jpg',
    },
    {
      Title: 'Esther und Abi Ofarim... singen Lieder der Welt',
      Year: '1965',
      imdbID: 'tt15434066',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Dandane Abi',
      Year: '2008',
      imdbID: 'tt10342578',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTI5NTdmYjMtN2NiZC00ZTdjLWJjOWYtOWU1YmVjZWE1ZmUwXkEyXkFqcGdeQXVyMzYxMzY2ODE@._V1_SX300.jpg',
    },
    {
      Title: 'Cheshmhay Abi Zahra',
      Year: '2000',
      imdbID: 'tt10577978',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Emi abi no hajimari to hajimari',
      Year: '2016',
      imdbID: 'tt5224870',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTNmNWY3OTMtOTQ1MC00MTFkLWI3NGYtZTUzMWUxZGQ5YjdkXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_SX300.jpg',
    },
    {
      Title: 'Abi Laâziz',
      Year: '2013',
      imdbID: 'tt5580726',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Helâl sana Recep Abi',
      Year: '1979',
      imdbID: 'tt8288922',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Prikolica SPI-90',
      Year: '1965',
      imdbID: 'tt0934549',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kavoka Spi',
      Year: '2008',
      imdbID: 'tt2339366',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMDZlYzAyZDctMjA0YS00ODZkLTljMjItYTI4NTNlNzJmNTVkXkEyXkFqcGdeQXVyMTgyOTkwOTk@._V1_SX300.jpg',
    },
    {
      Title: 'SPI: Caerleon',
      Year: '2012',
      imdbID: 'tt5025452',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Smíchov pláce, Brooklyn spí',
      Year: '2011',
      imdbID: 'tt9660606',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Licho nie spi',
      Year: '2020',
      imdbID: 'tt14837278',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BODI5YmM0NjItZTk4Ny00Y2Y3LWI0NDktYWQzOGEwM2JiZjcwXkEyXkFqcGdeQXVyMTEwMTY3NDI@._V1_SX300.jpg',
    },
    {
      Title: 'Big Smo',
      Year: '2014–',
      imdbID: 'tt3732608',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjI1NzE1ODkwNl5BMl5BanBnXkFtZTgwNjEyMjE4MTE@._V1_SX300.jpg',
    },
    {
      Title: 'Dva smo svijeta razlicita',
      Year: '2011–',
      imdbID: 'tt1866427',
      Type: 'series',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNGY1NzdmNjYtMjE5Ni00YzEzLThlOGYtOTRmNDU4NDk2ZTIzXkEyXkFqcGdeQXVyNjExMDYxNTI@._V1_SX300.jpg',
    },
    {
      Title: 'Danas smo pojeli zadnju kravu',
      Year: '2011',
      imdbID: 'tt2175615',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Ca smo na ovon svitu...',
      Year: '1973–',
      imdbID: 'tt0429324',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Dva smo svijeta razlicita',
      Year: '2010–',
      imdbID: 'tt1784883',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Ca smo na ovom svitu...',
      Year: '1973–',
      imdbID: 'tt1498576',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Mi smo ono sto izgubimo',
      Year: '2006',
      imdbID: 'tt0816581',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Big Smo: Boss of the Stix',
      Year: '2012',
      imdbID: 'tt2388628',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Izgleda da smo sami',
      Year: '2015',
      imdbID: 'tt5829262',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZTNjZTJhZjMtY2FhOC00MDljLWIzMzItNzc3ZGVmNmFiYmQ5XkEyXkFqcGdeQXVyMTE4ODM3NjM@._V1_SX300.jpg',
    },
    {
      Title: 'Htjeli smo radnike, a dosli su nam ljudi',
      Year: '2011',
      imdbID: 'tt6355378',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjJjOTkwYjQtN2MwMS00NmFiLWI2NzgtNzk3OWFkNDEzODAyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzAwNjI5NzI@._V1_SX300.jpg',
    },
    {
      Title: 'Dan kada smo svi gledali u nebo',
      Year: '1997',
      imdbID: 'tt7620406',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTFkZGVhM2EtNTE2MS00OGRiLWIzNjYtZmFhMWVkYWYyYTgzXkEyXkFqcGdeQXVyNzIyOTc3MzU@._V1_SX300.jpg',
    },
    {
      Title: 'Bioskopi koje smo voleli: Kino Boka',
      Year: '2018',
      imdbID: 'tt8105564',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZWM2ZTc4OGMtMGQ5Ni00ZDc2LTgyNjYtMmEwNmFiZWMwM2FlXkEyXkFqcGdeQXVyNDYzNzk3NDE@._V1_SX300.jpg',
    },
    {
      Title: 'Auto trubi: mi smo rodoljubi',
      Year: '1972',
      imdbID: 'tt8315286',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Vsi smo tu ze od nekdaj',
      Year: '2016',
      imdbID: 'tt8687684',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYzZlZjljZjQtYzEzNC00ZWNkLWI0ZjItNzA0YmY0M2JlZWU4XkEyXkFqcGdeQXVyMjIxNjYxMDU@._V1_SX300.jpg',
    },
    {
      Title: 'Sinovi smo tvog stijenja',
      Year: '2018',
      imdbID: 'tt10950990',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Tamo gde smo mi',
      Year: '2019',
      imdbID: 'tt10960100',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZTAzMjQ0ZWEtMmY5NS00NWFjLThjYWEtODU0NDI0NzY0ZjQwXkEyXkFqcGdeQXVyNzIwOTk3NDY@._V1_SX300.jpg',
    },
    {
      Title: 'Mi kao da smo dresirani da budemo ono sto jesmo',
      Year: '2003',
      imdbID: 'tt11296478',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kao da smo dresirani da budemo ovo sto jesmo',
      Year: '2003',
      imdbID: 'tt11300496',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Mi smo za pravicu',
      Year: '1969',
      imdbID: 'tt12627290',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Specijalna Olimpijada: Mi smo vec pobedili',
      Year: '2015',
      imdbID: 'tt5852800',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BN2IxNmNmOWUtMDJiNC00M2U4LTlmNzItZjNjZmRlMTgzNDdhXkEyXkFqcGdeQXVyNjc1ODg4MTE@._V1_SX300.jpg',
    },
    {
      Title: 'Smo',
      Year: '2013',
      imdbID: 'tt3228220',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: '13 Godine posle, gde smo danas',
      Year: '2012',
      imdbID: 'tt4042416',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Vi ste dobro, a kako smo mi?',
      Year: '2016–',
      imdbID: 'tt5355170',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Svi smo porota',
      Year: '1966',
      imdbID: 'tt0929628',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Mi smo smesna porodica',
      Year: '1981–',
      imdbID: 'tt1258909',
      Type: 'series',
      Poster: 'N/A',
    },
    {
      Title: 'Ljudi smo, zar ne?',
      Year: '2007',
      imdbID: 'tt1261062',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Ono sto smo zaboravili',
      Year: '1976',
      imdbID: 'tt0304500',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kakvi smo takvi smo',
      Year: '1991',
      imdbID: 'tt0316082',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Mi smo mlada vojska Titova',
      Year: '1976',
      imdbID: 'tt0316248',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Gradili smo... Petlje',
      Year: '1974',
      imdbID: 'tt0317597',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: "Srecni smo to je nase delo - Industrija tepiha 'Proleter'",
      Year: '1974',
      imdbID: 'tt0318714',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Vedno smo bili titovo Velenje',
      Year: '1982',
      imdbID: 'tt0402568',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Dokle smo stigli',
      Year: '1971',
      imdbID: 'tt0483604',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'MIN - To smo mi',
      Year: '1980',
      imdbID: 'tt0489221',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'SMO, el batallón olvidado',
      Year: '2012',
      imdbID: 'tt2205595',
      Type: 'movie',
      Poster: 'N/A',
    },
    {
      Title: 'Kako smo cesljali babu',
      Year: '2008',
      imdbID: 'tt2298375',
      Type: 'movie',
      Poster: 'N/A',
    },
  ];
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('sync')
  async insertMovies() {
    try {
      for (const movie of this.movieList) {
        await this.appService.insertMovies(movie);
      }
      debugger;
      return { result: 'Movie sync daone' };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
  @Get('list')
  async moviesList() {
    try {
      const movies = await this.appService.movieList();
      return { result: movies };
    } catch (error) {
      throw new ErrorException(error);
    }
  }
}
