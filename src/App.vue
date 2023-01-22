<template>
  <div id="app">
    <div class="container">
        <div class="mine">
          <div v-for="floor in floors" :key="floor" class="floor"></div>
          <div class="elevator" ref="elevator"
            v-bind:style="{
              bottom: `${currentHeight}%`, 
              height: `calc(100% / ${this.floors.length})`
            }">
            <div class="elevator__indication" ref="elevatorIndication">
              <div class="elevator__indication-direction">
                <svg class="arrow-up" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.56569 0.434315C6.25327 0.121895 5.74673 0.121895 5.43431 0.434315L0.343146 5.52548C0.0307262 5.8379 0.0307262 6.34443 0.343146 6.65685C0.655565 6.96927 1.1621 6.96927 1.47452 6.65685L6 2.13137L10.5255 6.65685C10.8379 6.96927 11.3444 6.96927 11.6569 6.65685C11.9693 6.34443 11.9693 5.8379 11.6569 5.52548L6.56569 0.434315ZM6.8 11L6.8 1H5.2L5.2 11H6.8Z" fill="white"/>
                </svg>
                <svg  class="arrow-down" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.43431 10.5657C5.74673 10.8781 6.25327 10.8781 6.56569 10.5657L11.6569 5.47452C11.9693 5.1621 11.9693 4.65557 11.6569 4.34315C11.3444 4.03073 10.8379 4.03073 10.5255 4.34315L6 8.86863L1.47452 4.34315C1.1621 4.03073 0.655565 4.03073 0.343146 4.34315C0.0307262 4.65557 0.0307262 5.1621 0.343146 5.47452L5.43431 10.5657ZM5.2 0L5.2 10H6.8L6.8 0L5.2 0Z" fill="white"/>
                </svg>
              </div>
              <span class="elevator__indication-floor" ref="elevatorIndicationFloor"></span>
            </div>
          </div>
        </div>
        <div class="buttons">
            <div v-for="floor in reverseMass" :key="floor" class="buttons__item">
                <span class="buttons__item-number">{{ floor }}</span>
                <button @click="addFloorList(floor)"
                  class="buttons__item-button"
                  v-bind:class="{active: inListOrder(floor)}">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.5" cy="7.5" r="3.75"/>
                    <circle cx="7.5" cy="7.5" r="7"/>
                  </svg>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      floors: [],
      currentFloor: 1,
      currentHeight: 0,
      orderVisitFloor: [],
      elevatorStatusStart: false
    }
  },
  methods: {

    inListOrder: function(floor) {
      for (let i = 0; i < this.orderVisitFloor.length; i++) {
        if(this.orderVisitFloor[i] === floor) {
          return true;
        }
      }
      return false;
    },

    addFloorList: function(floor) {
      for (let i = 0; i < this.orderVisitFloor.length; i++) {
        if(this.orderVisitFloor[i] === floor) {
          return;
        }
      }
      this.orderVisitFloor.push(floor);
      this.saveOrder();
      if (!this.elevatorStatusStart) {
        this.elevatorStatusStart = true;
        this.startElevator();
      }
    },

    startElevator: async function() {
      this.moveFloor(this.orderVisitFloor[0]);
    },

    moveFloor: async function(floor) {
      return new Promise(() => {
        if (this.currentFloor < floor) {
          this.$refs.elevatorIndicationFloor.textContent = floor;
          this.$refs.elevatorIndication.classList.add('move-up');
        } else if (this.currentFloor > floor) {
          this.$refs.elevatorIndicationFloor.textContent = floor;
          this.$refs.elevatorIndication.classList.add('move-down');
        }
        let timerId = setInterval(() => {
          if (this.currentFloor < floor) {
            this.currentHeight += 0.25;
          } else if (this.currentFloor > floor) {
            this.currentHeight -= 0.25;
          } else {
            return false;
          }
          if (this.currentHeight === (Math.ceil(100 / this.floors.length * (floor - 1)))) {
            this.$refs.elevator.classList.add('elevator-pause');
            clearInterval(timerId);
            this.orderVisitFloor.shift();
            this.saveOrder();
            this.saveElevatorPosition(floor);
            setTimeout(() => {
              this.$refs.elevator.classList.remove('elevator-pause');
              if (this.orderVisitFloor.length !== 0) {
                if (this.currentFloor < floor) {
                  this.$refs.elevatorIndication.classList.remove('move-up');
                } else if (this.currentFloor > floor) {
                  this.$refs.elevatorIndication.classList.remove('move-down');
                }
                this.currentFloor = floor;
                this.startElevator();
              } else {
                this.$refs.elevatorIndication.classList.remove('move-up');
                this.$refs.elevatorIndication.classList.remove('move-down');
                this.elevatorStatusStart = false;
                this.currentFloor = floor;
              }
            }, 3000);
          }
        }, 250 / (100 / this.floors.length));
      });
    },

    getData: async function() {
      let response = await fetch(`data.json`);
      return await response.json();
    },

    saveOrder: function() {
      localStorage.setItem('orderFloors', this.orderVisitFloor);
    },

    saveElevatorPosition: function(position) {
      localStorage.setItem('elevatorPosition', position);
    }

  },
  computed: {
    reverseMass() {
      return [...this.floors].reverse();
    },
    createFloors() {
      return [1, 2, 3, 4, 5]
    }
  },
  beforeMount() {
    this.getData().then((response) => {
      for (let i = 1; i <= response.countFloor; i++) {
        this.floors.push(i);
      }
      if (localStorage.getItem('orderFloors')) {
        this.orderVisitFloor = localStorage.getItem('orderFloors').split(',');
        this.startElevator();
      }
      if (localStorage.getItem('elevatorPosition')) {
        this.currentFloor = Number(localStorage.getItem('elevatorPosition'));
        this.currentHeight = 100 / this.floors.length * (this.currentFloor - 1);
      }
    }).catch(e => console.log(e));
  },
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
    --gray: #919191;
    --blue: #00D4D5;
    --orange: #FB8539;
}

div {
    box-sizing: border-box;
}

.container {
    display: flex;
    height: 100vh;
}

.mine, .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.mine {
    position: relative;
    width: 150px;
}

.buttons {
    width: 100%;
}

.floor, .buttons__item {
    flex: 1;
}

.buttons__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: 700;
}

.buttons__item-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 30px;
    width: 30px;
    border-radius: 3px;
    background: none;
    border: solid 1px var(--blue);
    cursor: pointer;
    transition: 0.2s;
}

.buttons__item-button:active {
  background-color: rgba(251, 133, 57, 0.1);
  border: solid 1px var(--orange);
}

.buttons__item-button:active svg circle:first-child {
  fill: var(--orange)
}

.buttons__item-button:active svg circle:nth-child(2) {
  stroke: var(--orange);
}

.buttons__item-button:hover {
  background-color: rgba(0, 212, 213, 0.1);
}

.buttons__item-button.active:hover {
  background-color: rgba(251, 133, 57, 0.1);
}

.buttons__item-button.active {
  border: solid 1px var(--orange);
}

.buttons__item-button svg circle:first-child {
  fill: var(--blue)
}

.buttons__item-button.active svg circle:first-child {
  fill: var(--orange)
}

.buttons__item-button svg circle:nth-child(2) {
  stroke: var(--blue);
}

.buttons__item-button.active svg circle:nth-child(2) {
  stroke: var(--orange);
}

.floor:first-child, .buttons__item:first-child {
    border-top: 1px solid var(--gray);
}

.floor, .buttons__item {
    border-bottom: 1px solid var(--gray);
}

.floor {
    border-right: 2px solid var(--gray) !important;
    border-left: 2px solid var(--gray) !important;
}

.buttons__item {
    padding: 10px;
}

.elevator {
    position: absolute;
    left: 2px;
    width: calc(100% - 4px);
    background-color: var(--blue);
}

.elevator-pause {
  animation-duration: 3s;
  animation-name: elevator-pause;
}

@keyframes elevator-pause {

  12.5% {
    opacity: 0.2;
  }

  25% {
    opacity: 1;
  }

  37.5% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }

  62.5% {
    opacity: 0.2;
  }

  75% {
    opacity: 1;
  }

  87.5% {
    opacity: 0.2;
  }

}

.elevator__indication {
  display: none;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: #fff;
  max-width: 50px;
  margin: 5px auto 0 auto;
  padding: 5px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
}

.elevator__indication.move-up, .elevator__indication.move-down {
  display: flex;
}

.elevator__indication.move-up .arrow-down,
.elevator__indication.move-down .arrow-up {
  display: none;
}

.elevator__indication-floor {
  font-size: 13px;
  margin-left: 5px;
}

</style>
