Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: '',
      goalNotification: 'Test'
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
      this.enteredValue = '';
      this.$refs.gN1.textContent = 'One item was added just now'
      if (this.goals.length > 3) {
        this.goals = this.goals.slice(1, this.goals.length);
        // this.goalNotification += ".You have typed in more than 3 strings. Automatic FIFO executed."
        this.$refs.gN2.textContent = "You've typed in more than 3 strings. Automatic FIFO executed."
        this.$refs.gN1.textContent += ". And the previous first item was deleted."
      }else {
        this.$refs.gN2.textContent = "Test";
      }
    },
    deleteGoal() {
      let goalsLen = this.goals.length;
      this.goals.pop();
      this.enteredValue = '';
      this.$refs.gN1.textContent = 'One item was removed just now';
      if (goalsLen <= 3){
        this.$refs.gN2.textContent = "Test";
        if (goalsLen == 0){
          this.$refs.gN2.textContent = "You've already got 0 strings. Unable to be deleted any further!"
          this.$refs.gN1.textContent = 'Test';
        }
      }
    }
  }
}).mount('#first-app');
