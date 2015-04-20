import FactualSearch from './factual-search';

export default ($http) => {
  const factualSearch = new FactualSearch({$http});

  return factualSearch;
};
