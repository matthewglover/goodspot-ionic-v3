import Person from './person';

export default (gsUser, gsGoodspotApi) => {
  const person = new Person({gsUser, gsGoodspotApi});

  return person;
};
