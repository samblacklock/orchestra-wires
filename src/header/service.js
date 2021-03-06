import Orchestra from 'orchestra';
import View from './view';

const HeaderService = Orchestra.Service.extend({
  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.collection = new Orchestra.Collection();
    this.view = new View({ collection: this.collection });
    this.container.show(this.view);
  },

  requests: {
    add: 'add',
    remove: 'remove',
    activate: 'activate',
  },

  add(model) {
    this.collection.add(model);
  },

  remove(model) {
    model = this.collection.findWhere(model);
    this.collection.remove(model);
  },

  activate(model) {
    this.collection.invoke('set', 'active', false);
    model = this.collection.findWhere(model);
    if (model) {
      model.set('active', true);
    }
  }
});

export default new HeaderService();
