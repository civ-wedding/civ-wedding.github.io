class RSVP {
  static get diplomacyChoices () {
    return {
      WAR: 0,
      PEACE: 1
    };
  }

  constructor () {
    this.token = '';
    this.name = '';
    this.willAttend = false;
    this.plusOne = false;
    this.warOrPeace = -1;
  }

  validate () {
    return new Promise(function(resolve, reject) {
      if (!this.name || !this.token) {
        return reject(new Error('Name or token not specified.'));
      }

      resolve();
    });
  }

  submit () {
    return this.validate()
      .then(function() {
        //new
      });
  }
}
