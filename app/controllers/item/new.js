import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addItem: function(){
			var title = this.get('title');
			var description = this.get('description');
			var date = this.get('date');

			//Create New Task
			var newItem = this.store.createRecord

		}
	}
});
