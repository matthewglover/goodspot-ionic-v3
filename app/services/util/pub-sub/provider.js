import PubSub from './pub-sub';

const pubSub = new PubSub();


// _ -> Provider
const gsPubSubProvider = () => {
  return {
    subscribe: (...args) => pubSub.subscribe(...args),
    unsubscribe: (...args) => pubSub.unsubscribe(...args),
    publish: (...args) => pubSub.publish(...args),
    $get: () => pubSub
  };
};


export default gsPubSubProvider;
