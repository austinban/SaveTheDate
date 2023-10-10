<template>
  <div class="encircle">
    <div class="arrow bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0px"
        y="0px"
        viewBox="0 0 32 40"
        style="enable-background: new 0 0 32 32"
        xml:space="preserve"
      >
        <g>
          <path
            d="M26.7,15.3c-0.4-0.4-1-0.4-1.4,0L17,23.6V6c0-0.6-0.4-1-1-1s-1,0.4-1,1v17.6l-8.3-8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l10,10c0,0,0,0,0,0c0.1,0.1,0.2,0.1,0.3,0.2c0,0,0,0,0,0C15.7,27,15.9,27,16,27c0.1,0,0.3,0,0.4-0.1c0.1,0,0.2-0.1,0.3-0.2l10-10   C27.1,16.3,27.1,15.7,26.7,15.3z"
          />
        </g>
        <text
          x="0"
          y="47"
          fill="#000000"
          font-size="5px"
          font-weight="bold"
          font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
        >
          Created by Nuriyawan
        </text>
        <text
          x="0"
          y="52"
          fill="#000000"
          font-size="5px"
          font-weight="bold"
          font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
        >
          from the Noun Project
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.encircle {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: solid 2px black;
}

.arrow {
  margin: 0 auto;
  margin-top: 16px;
  width: 30px;
  height: 30px;
}

@keyframes bounce {
  0% {
    transform: rotate(180deg) translateY(0px);
  }
  50% {
    transform: rotate(180deg) translateY(0px);
  }
  70% {
    transform: rotate(180deg) translateY(6px);
  }
  80% {
    transform: rotate(180deg) translateY(-2px);
  }
  90% {
    transform: rotate(180deg) translateY(2px);
  }
  100% {
    transform: rotate(180deg) translateY(0px);
  }
}

.bounce {
  animation: bounce 3s infinite;
}
</style>
