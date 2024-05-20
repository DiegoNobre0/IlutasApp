import { Evento } from 'src/domain-types'

// MOCK
export const mockEvento: Evento = {
  "id": 1,
  "name": "Torneio de Esportes",
  "description": "Um torneio emocionante com várias modalidades esportivas.",
  "urlImagem": "https://veja.abril.com.br/wp-content/uploads/2017/01/cao-labrador-3-copy.jpg?quality=90&strip=info&w=720&h=440&crop=1",
  "date": "2024-04-01",
  "expireDate": "2024-04-10",
  "organization": {
    "name": "Associação Esportiva",
    "responsible": "João Silva",
    "email": "joao@example.com",
    "phone": "+55 11 1234-5678"
  },
  "values": {
    date: "02 a 03 de março até 23:59",
    calendar: "01/04 a partir das 08:00",
    signDate: "01/02 a 01/03",
    payment: "Boleto, Pix e Cartão até 03 de março",
    generalCheck: "03/03 das 08h até 10/03  às 23:59h",
    oficialCheck: "03/03 das 08h até 10/03  às 23:59h",
    consultCheck: "03/03 das 08h até 10/03  às 23:59h",
    keys: "01/03 até 23:59"
  },
  "eventInformation": {
    "presentation": {
      "value": "Apresentação inicial",
      "order": 3,
      "content": "Conteúdo da apresentação inicial"
    },
    "categories": {
      "value": "Categorias",
      "order": 1,
      "content": "Conteúdo das categorias"
    },
    "keys": {
      "value": "Chaves",
      "order": 2,
      "content": "Conteúdo das chaves"
    },
    "results": {
      "value": "Resultados",
      "order": 4,
      "content": "Conteúdo dos resultados"
    },
    "cronogram": {
      "value": "Cronograma",
      "order": 5,
      "content": "Conteúdo do cronograma"
    },
    "warnings": {
      "value": "Avisos",
      "order": 6,
      "content": "Conteúdo dos avisos"
    },
    "galery": {
      "value": "Galeria",
      "order": 7,
      "content": "Conteúdo da galeria"
    }
  },
  "categories": ["Futebol", "Basquete", "Vôlei"],
  "modalities": ["Individual", "Equipe"],
  "competitors": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "idade": 25,
      "urlImagem": "https://pbs.twimg.com/media/FJVGY0-XIAIewJ2.jpg",
      "category": "Futebol",
      "modality": "Individual",
      "team": {
        "name": "Time A",
        "urlImagem": "https://example.com/timea.jpg",
        "teacher": "José"
      },
      "ranking": 1
    },
    {
      "id": 2,
      "nome": "João Souza",
      "idade": 30,
      "urlImagem": "https://cachorronatureba.com.br/wp-content/uploads/Dachshund11.jpg",
      "category": "Basquete",
      "modality": "Individual",
      "team": {
        "name": "Time B",
        "urlImagem": "https://example.com/timeb.jpg",
        "teacher": "Ana"
      },
      "ranking": 2
    },
    {
      "id": 3,
      "nome": "Pedro Oliveira",
      "idade": 28,
      "urlImagem": "https://cachorronatureba.com.br/wp-content/uploads/Dachshund11.jpg",
      "category": "Vôlei",
      "modality": "Equipe",
      "team": {
        "name": "Time C",
        "urlImagem": "https://example.com/timec.jpg",
        "teacher": "Mariana"
      },
      "ranking": 3
    }
  ],
  results: [
    {
      category: "# Kids 1 - Branca - Leve - Masculino",
      modality: "Categoria de Peso Jiu-Jitsu",
      description: "N° de atletas: 20",
      results: {
        firstPlace: {
          "id": 1,
          "nome": "Maria Silva",
          "idade": 25,
          "urlImagem": "https://pbs.twimg.com/media/FJVGY0-XIAIewJ2.jpg",
          "category": "Futebol",
          "modality": "Individual",
          "team": {
            "name": "Time A",
            "urlImagem": "https://example.com/timea.jpg",
            "teacher": "José"
          },
          "ranking": 1
        },
        secondPlace: {
          "id": 2,
          "nome": "João Souza",
          "idade": 30,
          "urlImagem": "https://cachorronatureba.com.br/wp-content/uploads/Dachshund11.jpg",
          "category": "Basquete",
          "modality": "Individual",
          "team": {
            "name": "Time B",
            "urlImagem": "https://example.com/timeb.jpg",
            "teacher": "Ana"
          },
          "ranking": 2
        },
      }
    }
  ],
  "liveUrl": "https://example.com/live"
}
