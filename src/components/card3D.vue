<template>
	<div class="card-wrap" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" ref="card"  @click="openlink">
	  <div class="card" :style="[cardStyle,cardBgImage]" >
		<div class="card-cover" :style="[cardBgTransform ,cardCoverImage]"></div>
		
	  </div>
	</div>
	
  </template>
  
  <script>
  export default {
	props: {
	  dataImage: {
		type: String,
		required: true
	  },
	  coverImage: {
		type: String,
		required: true
	  },
	  href: {
		type: String,
		required: false
	  }
	},
	mounted() {
	  this.width = this.$refs.card.offsetWidth;
	  this.height = this.$refs.card.offsetHeight;
	},
	data() {
	  return {
		width: 0,
		height: 0,
		mouseX: 0,
		mouseY: 0,
		mouseLeaveDelay: null
	  };
	},
	computed: {
	  mousePX() {
		return this.mouseX / this.width;
	  },
	  mousePY() {
		return this.mouseY / this.height;
	  },
	  cardStyle() {
		const rX = this.mousePX * 30;
		const rY = this.mousePY * -30;
		return {
		  transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
		};
	  },
	  cardBgTransform() {
		const tX = this.mousePX * -40;
		const tY = this.mousePY * -40;
		return {
		  transform: `translateX(${tX}px) translateY(${tY}px)`
		};
	  },
	  cardBgImage() {
		return {
		  backgroundImage: `url(${this.dataImage})`
		};
	  },
	  cardCoverImage() {
		return {
		  backgroundImage: `url(${this.coverImage})`
		};
	  }
	},
	methods: {
	  handleMouseMove(e) {
		this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
		this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
	  },
	  handleMouseEnter() {
		clearTimeout(this.mouseLeaveDelay);
	  },
	  handleMouseLeave() {
		this.mouseLeaveDelay = setTimeout(() => {
		  this.mouseX = 0;
		  this.mouseY = 0;
		}, 1000);
	  },
	  openlink() {
		if (this.href) {
			window.open(this.href,'_blank')
  };

	  }
	}
  };
  </script>
  <style>

  .card-wrap {
	margin: 10px;
	transform: perspective(800px);
	transform-style: preserve-3d;
	cursor: pointer;
  }
  .card-wrap:hover .card-info {
	transform: translateY(0);
  }
  .card-wrap:hover .card-info p {
	opacity: 1;
  }
  .card-wrap:hover .card-info, .card-wrap:hover .card-info p {
	transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .card-wrap:hover .card-info:after {
	transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
	opacity: 1;
	transform: translateY(0);
  }
  .card-wrap:hover .card-cover {
	transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
	opacity: 0.8;
  }
  .card-wrap:hover .card {
	transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
	box-shadow: rgba(255, 255, 255, 0.2) 0 0 40px 5px, white 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset white 0 0 0 6px;
  }
  
  .card {
	position: relative;
	/*flex: 0 0 240px;*/
	width: 100%;
	height: 300px;
	background-color: #333;
	overflow: hidden;
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
	transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	background-repeat: no-repeat;
  background-position: center center;
  background-size: 150%;
  }
  
  .card-cover {
	opacity: 0.5;
	position: absolute;

	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	padding: 20px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95), opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	pointer-events: none;
  }
  </style>