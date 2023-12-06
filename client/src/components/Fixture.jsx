import { useEffect } from 'react';
import { useMatchesContext } from '../MatchesContext';
import { useFavouritesContext } from '../FavouritesContext';
import { useFavouriteFunctions } from '../favouritesUtils';
import Match from './Match';

const exampleResponse = [
  {
    "fixture": {
        "id": 1035304,
        "referee": "Thomas Bramall, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T06:00:00-08:00",
        "timestamp": 1701612000,
        "periods": {
            "first": 1701612000,
            "second": null
        },
        "venue": {
            "id": 504,
            "name": "Vitality Stadium",
            "city": "Bournemouth, Dorset"
        },
        "status": {
            "long": "Halftime",
            "short": "HT",
            "elapsed": 45
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 35,
            "name": "Bournemouth",
            "logo": "https://media-4.api-sports.io/football/teams/35.png",
            "winner": null
        },
        "away": {
            "id": 66,
            "name": "Aston Villa",
            "logo": "https://media-4.api-sports.io/football/teams/66.png",
            "winner": null
        }
    },
    "goals": {
        "home": 1,
        "away": 1
    },
    "score": {
        "halftime": {
            "home": 1,
            "away": 1
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035305,
        "referee": "Peter Bankes, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-02T07:00:00-08:00",
        "timestamp": 1701529200,
        "periods": {
            "first": 1701529200,
            "second": 1701532800
        },
        "venue": {
            "id": 494,
            "name": "Emirates Stadium",
            "city": "London"
        },
        "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 42,
            "name": "Arsenal",
            "logo": "https://media-4.api-sports.io/football/teams/42.png",
            "winner": true
        },
        "away": {
            "id": 39,
            "name": "Wolves",
            "logo": "https://media-4.api-sports.io/football/teams/39.png",
            "winner": false
        }
    },
    "goals": {
        "home": 2,
        "away": 1
    },
    "score": {
        "halftime": {
            "home": 2,
            "away": 0
        },
        "fulltime": {
            "home": 2,
            "away": 1
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035306,
        "referee": "Anthony Taylor, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-02T07:00:00-08:00",
        "timestamp": 1701529200,
        "periods": {
            "first": 1701529200,
            "second": 1701532800
        },
        "venue": {
            "id": 10503,
            "name": "Gtech Community Stadium",
            "city": "Brentford, Middlesex"
        },
        "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 55,
            "name": "Brentford",
            "logo": "https://media-4.api-sports.io/football/teams/55.png",
            "winner": true
        },
        "away": {
            "id": 1359,
            "name": "Luton",
            "logo": "https://media-4.api-sports.io/football/teams/1359.png",
            "winner": false
        }
    },
    "goals": {
        "home": 3,
        "away": 1
    },
    "score": {
        "halftime": {
            "home": 0,
            "away": 0
        },
        "fulltime": {
            "home": 3,
            "away": 1
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035307,
        "referee": "Chris Kavanagh, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-02T07:00:00-08:00",
        "timestamp": 1701529200,
        "periods": {
            "first": 1701529200,
            "second": 1701532800
        },
        "venue": {
            "id": 512,
            "name": "Turf Moor",
            "city": "Burnley"
        },
        "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 44,
            "name": "Burnley",
            "logo": "https://media-4.api-sports.io/football/teams/44.png",
            "winner": true
        },
        "away": {
            "id": 62,
            "name": "Sheffield Utd",
            "logo": "https://media-4.api-sports.io/football/teams/62.png",
            "winner": false
        }
    },
    "goals": {
        "home": 5,
        "away": 0
    },
    "score": {
        "halftime": {
            "home": 2,
            "away": 0
        },
        "fulltime": {
            "home": 5,
            "away": 0
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035308,
        "referee": "Craig Pawson, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T06:00:00-08:00",
        "timestamp": 1701612000,
        "periods": {
            "first": 1701612000,
            "second": null
        },
        "venue": {
            "id": 519,
            "name": "Stamford Bridge",
            "city": "London"
        },
        "status": {
            "long": "Halftime",
            "short": "HT",
            "elapsed": 45
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 49,
            "name": "Chelsea",
            "logo": "https://media-4.api-sports.io/football/teams/49.png",
            "winner": true
        },
        "away": {
            "id": 51,
            "name": "Brighton",
            "logo": "https://media-4.api-sports.io/football/teams/51.png",
            "winner": false
        }
    },
    "goals": {
        "home": 2,
        "away": 1
    },
    "score": {
        "halftime": {
            "home": 2,
            "away": 1
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035309,
        "referee": "Stuart Attwell, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T06:00:00-08:00",
        "timestamp": 1701612000,
        "periods": {
            "first": 1701612000,
            "second": null
        },
        "venue": {
            "id": 550,
            "name": "Anfield",
            "city": "Liverpool"
        },
        "status": {
            "long": "First Half",
            "short": "1H",
            "elapsed": 45
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 40,
            "name": "Liverpool",
            "logo": "https://media-4.api-sports.io/football/teams/40.png",
            "winner": null
        },
        "away": {
            "id": 36,
            "name": "Fulham",
            "logo": "https://media-4.api-sports.io/football/teams/36.png",
            "winner": null
        }
    },
    "goals": {
        "home": 2,
        "away": 2
    },
    "score": {
        "halftime": {
            "home": 2,
            "away": 2
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035310,
        "referee": "S. Hooper",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T08:30:00-08:00",
        "timestamp": 1701621000,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 555,
            "name": "Etihad Stadium",
            "city": "Manchester"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 50,
            "name": "Manchester City",
            "logo": "https://media-4.api-sports.io/football/teams/50.png",
            "winner": null
        },
        "away": {
            "id": 47,
            "name": "Tottenham",
            "logo": "https://media-4.api-sports.io/football/teams/47.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035311,
        "referee": "Robert Jones, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-02T12:00:00-08:00",
        "timestamp": 1701547200,
        "periods": {
            "first": 1701547200,
            "second": 1701550800
        },
        "venue": {
            "id": 562,
            "name": "St. James' Park",
            "city": "Newcastle upon Tyne"
        },
        "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 34,
            "name": "Newcastle",
            "logo": "https://media-4.api-sports.io/football/teams/34.png",
            "winner": true
        },
        "away": {
            "id": 33,
            "name": "Manchester United",
            "logo": "https://media-4.api-sports.io/football/teams/33.png",
            "winner": false
        }
    },
    "goals": {
        "home": 1,
        "away": 0
    },
    "score": {
        "halftime": {
            "home": 0,
            "away": 0
        },
        "fulltime": {
            "home": 1,
            "away": 0
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035312,
        "referee": "Paul Tierney, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-02T09:30:00-08:00",
        "timestamp": 1701538200,
        "periods": {
            "first": 1701538200,
            "second": 1701541800
        },
        "venue": {
            "id": 566,
            "name": "The City Ground",
            "city": "Nottingham, Nottinghamshire"
        },
        "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 65,
            "name": "Nottingham Forest",
            "logo": "https://media-4.api-sports.io/football/teams/65.png",
            "winner": false
        },
        "away": {
            "id": 45,
            "name": "Everton",
            "logo": "https://media-4.api-sports.io/football/teams/45.png",
            "winner": true
        }
    },
    "goals": {
        "home": 0,
        "away": 1
    },
    "score": {
        "halftime": {
            "home": 0,
            "away": 0
        },
        "fulltime": {
            "home": 0,
            "away": 1
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1035313,
        "referee": "Michael Oliver, England",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T06:00:00-08:00",
        "timestamp": 1701612000,
        "periods": {
            "first": 1701612000,
            "second": null
        },
        "venue": {
            "id": 598,
            "name": "London Stadium",
            "city": "London"
        },
        "status": {
            "long": "Halftime",
            "short": "HT",
            "elapsed": 45
        }
    },
    "league": {
        "id": 39,
        "name": "Premier League",
        "country": "England",
        "logo": "https://media-4.api-sports.io/football/leagues/39.png",
        "flag": "https://media-4.api-sports.io/flags/gb.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 48,
            "name": "West Ham",
            "logo": "https://media-4.api-sports.io/football/teams/48.png",
            "winner": true
        },
        "away": {
            "id": 52,
            "name": "Crystal Palace",
            "logo": "https://media-4.api-sports.io/football/teams/52.png",
            "winner": false
        }
    },
    "goals": {
        "home": 1,
        "away": 0
    },
    "score": {
        "halftime": {
            "home": 1,
            "away": 0
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
  },
  {
    "fixture": {
        "id": 1048992,
        "referee": "Tobias Stieler, Germany",
        "timezone": "America/Vancouver",
        "date": "2023-12-03T06:30:00-08:00",
        "timestamp": 1701613800,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 11899,
            "name": "MEWA ARENA",
            "city": "Mainz"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 13"
    },
    "teams": {
        "home": {
            "id": 164,
            "name": "FSV Mainz 05",
            "logo": "https://media-4.api-sports.io/football/teams/164.png",
            "winner": null
        },
        "away": {
            "id": 160,
            "name": "SC Freiburg",
            "logo": "https://media-4.api-sports.io/football/teams/160.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1048991,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-03T08:30:00-08:00",
        "timestamp": 1701621000,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 699,
            "name": "BayArena",
            "city": "Leverkusen"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 13"
    },
    "teams": {
        "home": {
            "id": 168,
            "name": "Bayer Leverkusen",
            "logo": "https://media-4.api-sports.io/football/teams/168.png",
            "winner": null
        },
        "away": {
            "id": 165,
            "name": "Borussia Dortmund",
            "logo": "https://media-4.api-sports.io/football/teams/165.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1048995,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-03T10:30:00-08:00",
        "timestamp": 1701628200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 698,
            "name": "WWK Arena",
            "city": "Augsburg"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 13"
    },
    "teams": {
        "home": {
            "id": 170,
            "name": "FC Augsburg",
            "logo": "https://media-4.api-sports.io/football/teams/170.png",
            "winner": null
        },
        "away": {
            "id": 169,
            "name": "Eintracht Frankfurt",
            "logo": "https://media-4.api-sports.io/football/teams/169.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1049003,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-08T11:30:00-08:00",
        "timestamp": 1702063800,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 724,
            "name": "PreZero Arena",
            "city": "Sinsheim"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 167,
            "name": "1899 Hoffenheim",
            "logo": "https://media-4.api-sports.io/football/teams/167.png",
            "winner": null
        },
        "away": {
            "id": 176,
            "name": "VfL BOCHUM",
            "logo": "https://media-4.api-sports.io/football/teams/176.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1048999,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T06:30:00-08:00",
        "timestamp": 1702132200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 748,
            "name": "Stadion An der Alten Försterei",
            "city": "Berlin"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 182,
            "name": "Union Berlin",
            "logo": "https://media-4.api-sports.io/football/teams/182.png",
            "winner": null
        },
        "away": {
            "id": 163,
            "name": "Borussia Monchengladbach",
            "logo": "https://media-4.api-sports.io/football/teams/163.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1049000,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T06:30:00-08:00",
        "timestamp": 1702132200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 10491,
            "name": "Deutsche Bank Park",
            "city": "Frankfurt am Main"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 169,
            "name": "Eintracht Frankfurt",
            "logo": "https://media-4.api-sports.io/football/teams/169.png",
            "winner": null
        },
        "away": {
            "id": 157,
            "name": "Bayern Munich",
            "logo": "https://media-4.api-sports.io/football/teams/157.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1049001,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T06:30:00-08:00",
        "timestamp": 1702132200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 752,
            "name": "VOLKSWAGEN ARENA",
            "city": "Wolfsburg"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 161,
            "name": "VfL Wolfsburg",
            "logo": "https://media-4.api-sports.io/football/teams/161.png",
            "winner": null
        },
        "away": {
            "id": 160,
            "name": "SC Freiburg",
            "logo": "https://media-4.api-sports.io/football/teams/160.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1049004,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T06:30:00-08:00",
        "timestamp": 1702132200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 755,
            "name": "wohninvest WESERSTADION",
            "city": "Bremen"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 162,
            "name": "Werder Bremen",
            "logo": "https://media-4.api-sports.io/football/teams/162.png",
            "winner": null
        },
        "away": {
            "id": 170,
            "name": "FC Augsburg",
            "logo": "https://media-4.api-sports.io/football/teams/170.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1049006,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T06:30:00-08:00",
        "timestamp": 1702132200,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 723,
            "name": "Voith-Arena",
            "city": "Heidenheim an der Brenz"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 180,
            "name": "FC Heidenheim",
            "logo": "https://media-4.api-sports.io/football/teams/180.png",
            "winner": null
        },
        "away": {
            "id": 181,
            "name": "SV Darmstadt 98",
            "logo": "https://media-4.api-sports.io/football/teams/181.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
},
{
    "fixture": {
        "id": 1048998,
        "referee": null,
        "timezone": "America/Vancouver",
        "date": "2023-12-09T09:30:00-08:00",
        "timestamp": 1702143000,
        "periods": {
            "first": null,
            "second": null
        },
        "venue": {
            "id": 19381,
            "name": "SIGNAL IDUNA PARK",
            "city": "Dortmund"
        },
        "status": {
            "long": "Not Started",
            "short": "NS",
            "elapsed": null
        }
    },
    "league": {
        "id": 78,
        "name": "Bundesliga",
        "country": "Germany",
        "logo": "https://media-4.api-sports.io/football/leagues/78.png",
        "flag": "https://media-4.api-sports.io/flags/de.svg",
        "season": 2023,
        "round": "Regular Season - 14"
    },
    "teams": {
        "home": {
            "id": 165,
            "name": "Borussia Dortmund",
            "logo": "https://media-4.api-sports.io/football/teams/165.png",
            "winner": null
        },
        "away": {
            "id": 173,
            "name": "RB Leipzig",
            "logo": "https://media-4.api-sports.io/football/teams/173.png",
            "winner": null
        }
    },
    "goals": {
        "home": null,
        "away": null
    },
    "score": {
        "halftime": {
            "home": null,
            "away": null
        },
        "fulltime": {
            "home": null,
            "away": null
        },
        "extratime": {
            "home": null,
            "away": null
        },
        "penalty": {
            "home": null,
            "away": null
        }
    }
}
]

function Fixture() {
  const matchesFromDb = useMatchesContext();
  const { handleFavourite } = useFavouriteFunctions();
  const { favourites } = useFavouritesContext();

  // Sort matches by date
  const sortedMatches = matchesFromDb.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  async function fetchData() {
    // Replace with logic of fetch from api
    const transformedMatches = exampleResponse.map((exampleMatch) => {
      // Transform data
      const homeScore = exampleMatch.goals.home !== null ? exampleMatch.goals.home : 0;
      const awayScore = exampleMatch.goals.away !== null ? exampleMatch.goals.away : 0;
      return {
        id: exampleMatch.fixture.id,
        date: exampleMatch.fixture.date,
        league: exampleMatch.league.name,
        status: exampleMatch.fixture.status.short,
        homeScore,
        awayScore,
        homeTeam: {
          id: exampleMatch.teams.home.id,
          name: exampleMatch.teams.home.name,
          logo: exampleMatch.teams.home.logo,
        },
        awayTeam: {
          id: exampleMatch.teams.away.id,
          name: exampleMatch.teams.away.name,
          logo: exampleMatch.teams.away.logo,
        },
      };
    });
    return transformedMatches;
  }

  // Update db with latest data
  async function updateData() {
    const transformedMatches = await fetchData();
    transformedMatches.forEach(async (match) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(match),
        });
        const data = await response.json();
        console.log('Match created:', data);
      } catch (error) {
        console.error('Error creating match:', error);
      }
    });
  }

  // Execute updateData function at intervals of choice
  useEffect(() => {
    const interval = setInterval(() => {
      updateData(); // Call the updateData function
    }, 360000); // 3600000 milliseconds = 1 hour

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }); // Empty dependency array to run this effect only once on mount

  return (
    <div className="match-list">
      {sortedMatches.map((match) => (
        <Match
        key={match.id}
        matchData={match}
        isFavourited={favourites.includes(match.id)}
        handleFavourite={handleFavourite}
      />
      ))}
    </div>
  );
}

export default Fixture;