export type Store = {
  id: string;
  name: string;
  address: string;
  hours?: string;
};

export type City = {
  id: string;
  name: string;
  stores: Store[];
};

export const cities: City[] = [
  {
    id: 'cidade-a',
    name: 'Caxias do Sul',
    stores: [
      { id: 'a-centro', name: 'Loja Centro', address: 'Av. Ruben Bento Alves, 5336, Caxias do Sul - RS', hours: 'Seg a Sex, 9h às 18h' },
      { id: 'a-shopping', name: 'Loja Sagrada Família', address: 'Av. Exemplo, 456, Caxias do Sul - RS', hours: 'Todos os dias, 10h às 22h' },
    ],
  },
  {
    id: 'cidade-b',
    name: 'Gramado',
    stores: [
      { id: 'b-matriz', name: 'Loja Matriz', address: 'Rua Modelo, 789, Gramado - RS', hours: 'Seg a Sáb, 9h às 17h' },
    ],
  },
];