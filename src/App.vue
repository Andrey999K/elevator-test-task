<template>
  <div id="app">
    <div class="container">
        <div class="mine">
            <div v-for="floor in floors" :key="floor" class="floor"></div>
            <div class="elevator" ref="elevator"
            v-bind:style="{bottom: `${currentHeight}%`}"></div>
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
      floors: [1, 2, 3, 4, 5],
      currentFloor: 1,
      currentHeight: 0,
      orderVisitFloor: [],
      elevatorStatusStart: false
    }
  },
  methods: {
    inListOrder: function (floor) {
      for (let i = 0; i < this.orderVisitFloor.length; i++) {
        if(this.orderVisitFloor[i] === floor) {
          return true;
        }
      }
      return false;
    },
    addFloorList: function (floor) {
      for (let i = 0; i < this.orderVisitFloor.length; i++) {
        if(this.orderVisitFloor[i] === floor) {
          return;
        }
      }
      this.orderVisitFloor.push(floor);
      if (!this.elevatorStatusStart) {
        this.elevatorStatusStart = true;
        setTimeout(() => {
          this.startElevator();
        }, 0);
        
      }
      console.log(this.orderVisitFloor);
    },
    startElevator: async function() {
      while (this.orderVisitFloor.length !== 0) {
        await this.moveFloor(this.orderVisitFloor[0]);
        setTimeout(() => {
          if (this.orderVisitFloor.length === 0) {
            this.elevatorStatusStart = false;
          }
        }, 3000);
        console.log("gggg");
      }
    },
    moveFloor: function(floor) {
      return new Promise(() => {
        let timerId = setInterval(() => {
        if (this.currentFloor < floor) {
          this.currentHeight++;
        } else if (this.currentFloor > floor) {
          this.currentHeight--;
        } else {
          return false;
        }
        if (this.currentHeight === (100 / this.floors.length * (floor - 1))) {
          this.currentFloor = floor;
          this.$refs.elevator.classList.add('elevator-pause');
          this.orderVisitFloor.shift();
          clearInterval(timerId);
        }
      }, 30);
      
    });
      // }).then(() => {
      //   console.log("gffffefwfewfewfe");
      //   setTimeout(() => {
      //     if (this.orderVisitFloor.length === 0) {
      //       this.elevatorStatusStart = false;
      //     }
      //   }, 3000);
      // });
    }
  },
  computed: {
    reverseMass () {
      return [...this.floors].reverse();
    }
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
    height: calc(100% / 5);
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

</style>
