var loaderAssets = [
  "btn-start-shadow.png",
  "btn-start.png",
  "child.png",
  "father.png",
  "loading-container.png",
  "loading-progress.png",
  "loading-txt.png",
  "lock.png",
  "logo-word-1.png",
  "logo-word-2.png",
  "logo-word-3.png",
  "logo-word-4.png",
  "logo-word-5.png",
  "logo.png",
  "mother.png",
  "scene-1-bg.jpg",
  "scene-2-bg.jpg",
  "scene-3-bg.jpg",
  "scene-3-blackboard.png",
  "scene-3-body.png",
  "scene-3-book.png",
  "scene-3-chair.png",
  "scene-3-drop.png",
  "scene-3-equipment.png",
  "scene-3-hand.png",
  "scene-3-light.png",
  "scene-3-smoke.png",
  "scene-4-bg.jpg",
  "scene-4-clock-hour.png",
  "scene-4-clock-minute.png",
  "scene-4-door-closed.png",
  "scene-4-door-opened.png",
  "scene-4-factory.png",
  "scene-4-man-left.png",
  "scene-4-man-middle.png",
  "scene-4-man-right.png",
  "scene-4-men-1.png",
  "scene-4-men-2.png",
  "scene-5-bg.jpg",
  "scene-5-body.png",
  "scene-5-hand.png",
  "scene-5-head.png",
  "scene-6-bg.jpg",
  "scene-6-blackboard.png",
  "scene-6-hand-1.png",
  "scene-6-hand-2.png",
  "scene-6-head-1.png",
  "scene-6-head-2.png",
  "scene-6-photo.png",
  "scene-7-bg.jpg",
  "scene-7-building.png",
  "scene-7-flag.png",
  "scene-7-map-building.png",
  "scene-7-map.png",
  "scene-7-shanghai.png",
  "scene-8-bg.jpg",
  "scene-8-body.png",
  "scene-8-dancer.png",
  "scene-8-hand-1.png",
  "scene-8-hand-2.png",
  "scene-8-hand-3.png",
  "scene-8-king-hand.png",
  "scene-8-king.png",
  "scene-8-light-2.png",
  "scene-8-light-3.png",
  "scene-8-light-4.png",
  "scene-8-light-5.png",
  "scene-8-queen-hand.png",
  "scene-8-queen.png",
  "scene-8-sunshine.png",
  "scene-9-banner.png",
  "scene-9-bg.jpg",
  "scene-9-people.png",
  "text-2-1.png",
  "text-3-1.png",
  "text-4-1.png",
  "text-4-2.png",
  "text-4-3.png",
  "text-4-4.png",
  "text-5-1.png",
  "text-7-1.png",
  "text-7-2.png",
  "text-8-1.png",
  "text-8-2.png",
  "text-9-1.png",
  "window.png",
  "scene-8-light-1.png"
]
var SOLWAY = window.SOLWAY || {};

var app; // 舞台
var container; // 舞台容器
var scroller; // 滚动模块
var firedEvents = []; // 记录场景进度
var clickGroup; // 可点击层
var stages = [1101, 575, 1185, 1270, 1118, 1329, 2040, 3150, 1330]; // 场景节点

var imgRoot = '../images/';

SOLWAY.Loader = (function(){
  var loading = $('.loading');
  var main = $('.main');

  function init() {
    // init app
    app = new PIXI.Application(640, 1040, {
      transparent: true
    });
    main.append(app.view);

    // add display group
    app.stage.displayList = new PIXI.DisplayList();
    clickGroup = new PIXI.DisplayGroup(5, false);


    // create container for app
    container = new PIXI.Container();
    // container.interactive = true;

    // after all imgs have been loaded
    var assets = _.map(loaderAssets, function(img) {
      return imgRoot + img
    })
    PIXI.loader
      .add(assets)
      .on("progress", loadProgressHandler)
      .load(setup);
  }

  function loadProgressHandler(loader) {
    var percentage = loader.progress;
    var progressHeight = Math.ceil(192 * percentage / 100) + 'px';
    loading.find('.container span').eq(1).css({'width': progressHeight});
  }

  function setup() {
    // hide loading and start playing
    hide();
    SOLWAY.Main.init();
  }

  function hide() {
    // hide loading
    loading.hide();
  }

  return {
    init: init
  }
})()

SOLWAY.Main = (function(){
  function init() {
    SOLWAY.Scroller.init(container);
    var scene1 = SOLWAY.Scene1.init();
    var scene2 = SOLWAY.Scene2.init();
    var scene3 = SOLWAY.Scene3.init();
    var scene4 = SOLWAY.Scene4.init();
    var scene5 = SOLWAY.Scene5.init();
    var scene6 = SOLWAY.Scene6.init();
    var scene7 = SOLWAY.Scene7.init();
    var scene8 = SOLWAY.Scene8.init();
    var scene9 = SOLWAY.Scene9.init();

    // scrollTo
    scroller.scrollTo(0, stagePosition(0))

    // -- add scene
    container.addChild(scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9);
    app.stage.addChild(container);
  }

  return {
    init: init
  }
})()

// -----------------场景1----------------- //
SOLWAY.Scene1 = (function(){
  var scene,
      logo,
      logoText1,
      logoText2,
      logoText3,
      logoText4,
      logoText5,
      scene1Bg,
      button;

  function init() {
    scene = createContainer({ x: 0, y: 0 });
    logo = createContainer();
    bg = createSprite("scene-1-bg.jpg");
    button = createContainer({ x: 124, y: 210, interactive: true })
    // button.displayGroup = clickGroup;

    logoText1 = createSprite("logo-word-1.png", { x:270, y:69 });
    logoText2 = createSprite("logo-word-2.png", { x:281, y:201 });
    logoText3 = createSprite("logo-word-3.png", { x:281, y:337 });
    logoText4 = createSprite("logo-word-4.png", { x:279, y:522 });
    logoText5 = createSprite("logo-word-5.png", { x:254, y:653 });
    var btnText = createSprite("btn-start.png", { x:2, y:13 });
    var btnShadow = createSprite("btn-start-shadow.png", { x:0, y:0 });

    // add sprite to container
    logo.addChild(logoText1, logoText2, logoText3, logoText4, logoText5)
    button.addChild(btnShadow, btnText)
    // add containers to scene
    scene.addChild(bg, logo, button)
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
    TweenMax.staggerFrom([logoText1,logoText2,logoText3,logoText4,logoText5], 0.5, { alpha:0, x:'+=40', ease: Back.easeInOut }, 0.2);
    TweenMax.from(button,0.5,{ x:'-=20', alpha:0 }).delay(1);
  }

  function bindEvents() {
    button.on('pointertap', function() {
      alert('start clicked')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景2----------------- //
SOLWAY.Scene2 = (function(){
  var scene,
      bg,
      text,
      windows,
      family,
      mother,
      father,
      child;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(1) });
    bg = createSprite("scene-2-bg.jpg");
    windows = createSprite("window.png", { x: 87, y: 0 });
    text = createSprite("text-2-1.png", { x: 163, y: 104 });
    family = createContainer({ x: 290, y: 73 });
    mother = createSprite("mother.png", { x: -10, y: -5 });
    father = createSprite("father.png", { x: -10, y: 81 });
    child = createSprite("child.png", { x: 28, y: 78 });

    // add sprite to container
    family.addChild(father, mother, child)
    // add containers to scene
    scene.addChild(bg, family, windows, text)
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
  }

  return {
    init: init
  }
})()

// -----------------场景3----------------- //
SOLWAY.Scene3 = (function(){
  var scene,
      bg,
      blackboard,
      book,
      chair,
      equipment,
      light,
      smoke,
      man,
      text,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(2) });
    bg = createSprite("scene-3-bg.jpg");
    blackboard = createSprite("scene-3-blackboard.png", { x:46, y:461 });
    book = createSprite("scene-3-book.png", { x:0, y:975 });
    chair = createSprite("scene-3-chair.png", { x:0, y:757 });
    equipment = createSprite("scene-3-equipment.png", { x:3, y:504 });
    light = createSprite("scene-3-light.png", { x:351, y:445 });
    smoke = createSprite("scene-3-smoke.png", { x:405, y:806 });
    text = createSprite("text-3-1.png", { x:96, y:304 });
    man = createContainer({ x:4, y:739, interactive: true });
    hint = createHintContainer({ x:282, y:631 })

    var body = createSprite("scene-3-body.png", { x:0, y:0 })
    var hand = createSprite("scene-3-hand.png", { x:230, y:0 })
    var drop = createSprite("scene-3-drop.png", { x:273, y:46 })

    // add sprite to container
    man.addChild(body, hand, drop)
    // add containers to scene
    scene.addChild(bg, blackboard, light, equipment, chair,smoke, book, man, text, hint)
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {

  }

  function bindEvents() {
    man.on("pointertap", function() {
      showVideo('video source');
    })
  }

  return {
    init: init
  }
})()

// -----------------场景4----------------- //
SOLWAY.Scene4 = (function(){
  var scene,
      bg,
      clock_hour,
      clock_minute,
      door_closed,
      door_opened,
      factory,
      man_left,
      man_middle,
      man_right,
      men_1,
      men_2,
      text_1,
      text_2,
      text_3,
      text_4,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(3) });
    bg = createSprite('scene-4-bg.jpg', { x: 0, y:0 });
    clock_hour = createSprite('scene-4-clock-hour.png', { x: 133, y:598 });
    clock_minute = createSprite('scene-4-clock-minute.png', { x: 305, y:294 });
    door_closed = createSprite('scene-4-door-closed.png', { x: 35, y:521 });
    door_opened = createSprite('scene-4-door-opened.png', { x: 35, y:521, alpha: 0 });
    factory = createSprite('scene-4-factory.png', { x: 8, y:256 });
    man_left = createSprite('scene-4-man-left.png', { x: 0, y:61 });
    man_middle = createSprite('scene-4-man-middle.png', { x: 0, y:253, interactive: true });
    man_right = createSprite('scene-4-man-right.png', { x: 0, y:408 });
    men_1 = createSprite('scene-4-men-1.png', { x: 22, y:579 });
    men_2 = createSprite('scene-4-men-2.png', { x: 0, y:794 });
    text_1 = createSprite('text-4-1.png', { x: 473, y:531 });
    text_2 = createSprite('text-4-2.png', { x: 372, y:0 });
    text_3 = createSprite('text-4-3.png', { x: 388, y:288 });
    text_4 = createSprite('text-4-4.png', { x: 200, y:549 });
    hint = createHintContainer({ x:137, y:205 })

    // add sprite to container
    // man.addChild(body, hand, drop)
    // add containers to scene
    scene.addChild(bg, clock_hour, clock_minute, factory, door_closed, door_opened, men_1, men_2, man_left, man_middle, man_right, text_1, text_2, text_3, text_4, hint)
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    man_middle.on('pointertap', function() {
      showVideo('sad')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景5----------------- //
SOLWAY.Scene5 = (function(){
  var scene,
      bg,
      text,
      body,
      head,
      hand,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(4) });
    bg = createSprite('scene-5-bg.jpg', { x:0, y:0 });
    text = createSprite('text-5-1.png', { x:456, y:334 });
    body = createSprite('scene-5-body.png', { x:0, y:0, interactive:true });
    head = createSprite('scene-5-head.png', { x:359, y:67 });
    hand = createSprite('scene-5-hand.png', { x:119, y:603 });
    hint = createHintContainer({ x:225, y:340 })

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, body, head, hand, text, hint);
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    body.on('pointertap', function() {
      showVideo('asda')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景6----------------- //
SOLWAY.Scene6 = (function(){
  var scene,
      bg,
      blackboard,
      hand_1,
      hand_2,
      head_1,
      head_2,
      photo,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(5) });
    bg = createSprite('scene-6-bg.jpg', { x:0, y:0 });
    blackboard = createSprite('scene-6-blackboard.png', { x:0, y:545 });
    hand_1 = createSprite('scene-6-hand-1.png', { x:248, y:648 });
    hand_2 = createSprite('scene-6-hand-2.png', { x:247, y:880 });
    head_1 = createSprite('scene-6-head-1.png', { x:384, y:726 });
    head_2 = createSprite('scene-6-head-2.png', { x:314, y:1110 });
    photo = createSprite('scene-6-photo.png', { x:95, y:3, interactive:true });
    hint = createHintContainer({ x:323, y:58 })
    // add sprite to container
    // add containers to scene
    scene.addChild(bg, photo, blackboard, hand_1, hand_2, head_1, head_2, hint);
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    photo.on('pointertap', function() {
      showVideo('asdds')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景7----------------- //
SOLWAY.Scene7 = (function(){
  var scene,
      bg,
      building,
      flag,
      map_building,
      map,
      shanghai,
      text_1,
      text_2,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(6) });
    bg = createSprite('scene-7-bg.jpg', { x:0, y:0 });
    building = createSprite('scene-7-building.png', { x:15, y:853 });
    flag = createSprite('scene-7-flag.png', { x:0, y:572 });
    map_building = createSprite('scene-7-map-building.png', { x:280, y:313, interactive:true });
    map = createSprite('scene-7-map.png', { x:95, y:0 });
    shanghai = createSprite('scene-7-shanghai.png', { x:278, y:410 });
    text_1 = createSprite('text-7-1.png', { x:24, y:75 });
    text_2 = createSprite('text-7-2.png', { x:517, y:843 });
    hint = createHintContainer({ x:320, y:184 })

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, map, map_building, shanghai, building, flag, text_1, text_2, hint);
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    map_building.on('pointerdown', function() {
      showVideo('asds')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景8----------------- //
SOLWAY.Scene8 = (function(){
  var scene,
      bg,
      dancer,
      king_hand,
      king,
      light,
      queen_hand,
      queen,
      sunny,
      text_1,
      text_2,
      hint,
      hint2;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(7) });
    bg = createSprite('scene-8-bg.jpg', { x:0, y:0 });
    dancer = createSprite('scene-8-dancer.png', { x:344, y:613 });
    king_hand = createSprite('scene-8-king-hand.png', { x:84, y:978 });
    king = createSprite('scene-8-king.png', { x:0, y:925 });
    queen_hand = createSprite('scene-8-queen-hand.png', { x:61, y:1188 });
    queen = createSprite('scene-8-queen.png', { x:0, y:1129 });
    text_1 = createSprite('text-8-1.png', { x:74, y:372 });
    text_2 = createSprite('text-8-2.png', { x:351, y:1910 });
    sunny = createContainer({ x:0, y: 1595 });
    var ship = createSprite('scene-8-sunshine.png', { x:0, y:0 });
    var body = createSprite('scene-8-body.png', { x:0, y:108 });
    var hand_1 = createSprite('scene-8-hand-1.png', { x:215, y:181 });
    var hand_2 = createSprite('scene-8-hand-2.png', { x:435, y:860 });
    var hand_3 = createSprite('scene-8-hand-3.png', { x:307, y:945 });
    light = createContainer();
    var light_1 = createSprite('scene-8-light-1.png', { x:0, y:63 });
    var light_2 = createSprite('scene-8-light-2.png', { x:0, y:40 });
    var light_3 = createSprite('scene-8-light-3.png', { x:0, y:627 });
    var light_4 = createSprite('scene-8-light-4.png', { x:0, y:740 });
    var light_5 = createSprite('scene-8-light-5.png', { x:0, y:1231 });
    hint = createHintContainer({ x:218, y:887 })
    hint2 = createHintContainer({ x:453, y:605 })

    // add sprite to container
    light.addChild(light_1, light_2, light_3, light_4, light_5)
    sunny.addChild(ship, body, hand_1, hand_2, hand_3, hint2)
    // add containers to scene
    scene.addChild(bg, dancer, light, king, king_hand, queen, queen_hand, sunny, text_1, text_2, hint);
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    king.on('pointertap', function() {
      showVideo('asdas')
    })
    sunny.on('pointertap', function() {
      showVideo('asdas')
    })
  }

  return {
    init: init
  }
})()

// -----------------场景9----------------- //
SOLWAY.Scene9 = (function(){
  var scene,
      bg,
      banner,
      people,
      text,
      hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(8) });
    bg = createSprite('scene-9-bg.jpg', { x:0, y:0 });
    banner = createSprite('scene-9-banner.png', { x:431, y:56 });
    people = createSprite('scene-9-people.png', { x:0, y:194 });
    text = createSprite('text-9-1.png', { x:582, y:792 });
    hint = createHintContainer({ x:464, y:35 })

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, banner, people, text, hint);
    // animation
    anim()
    // bind events
    bindEvents()
    // return scene
    return scene
  }

  function anim() {
  }

  function bindEvents() {
    banner.on('pointertap', function() {
      showVideo('asdds')
    })
  }

  return {
    init: init
  }
})()

// -----------------滚动条实例----------------- //
SOLWAY.Scroller = (function(container){
  function init(container) {
    scroller = new Scroller(function(left, top, zoom) {
      container.y = -top;
      if(top > 100) {
        SOLWAY.Utils.fireOnce('ddd', function() {
          console.log('do it top to 100')
        })
      }
    }, {
        zooming: true,
        bouncing: false
    });
    var stageHeight = stagePosition(stages.length)
    scroller.setDimensions(app.view.width, app.view.height, app.view.height, stageHeight);

    var mousedown = false;
    document.addEventListener("touchstart", function(e) {
      scroller.doTouchStart(e.touches, e.timeStamp);
      mousedown = true;
    }, false);

    document.addEventListener("touchmove", function(e) {
      if (!mousedown) {
        return;
      }
      scroller.doTouchMove(e.touches, e.timeStamp);
      mousedown = true;
    }, false);

    document.addEventListener("touchend", function(e) {
      if (!mousedown) {
        return;
      }
      scroller.doTouchEnd(e.timeStamp);
      mousedown = false;
    }, false);
  }

  return {
    init: init
  }
})()

// -----------------视频实例----------------- //
SOLWAY.Video = (function(){
  // 帧动画
  function show(src) {
    console.log('show video', src);
  }

  function hide() {
    console.log('hide video');
  }

  return {
    show: show,
    hide: hide
  }
})()

// -----------------通用方法----------------- //
SOLWAY.Utils = (function(){
  // 帧动画
  function createAnimatedSprite(name, num, opt, start) {
    var textureArray = [];
    for (let i=0; i < num; i++) {
       var texture = PIXI.Texture.fromImage(name + i + '.png');
       textureArray.push(texture);
    };
    var mc = new PIXI.AnimatedSprite(textureArray);
    if (opt) {
      _.forIn(opt, function(value, key) {
        mc[key] = value;
      });
    }
    return mc;
  }
  // create container
  function createContainer(opt) {
    var _container = new PIXI.Container();
    if (opt) {
      _.forIn(opt, function(value, key) {
          _container[key] = value;
      });
    }
    return _container;
  }
  // create hint container
  function createHintContainer(opt) {
    var _container = new PIXI.Container();
    var hint_hand = createSprite("hand.png", { x:54, y:43 });
    var hint_bg = createSprite("hand-bg.png", { x:0, y:0 });
    _container.addChild(hint_bg, hint_hand);
    if (opt) {
      _.forIn(opt, function(value, key) {
          _container[key] = value;
      });
    }
    // add animation
    TweenMax.to(_container, 0.3,{ x:'+=10', y:'-=10', yoyo:true }).repeat(-1);
    return _container;
  }
  // create sprite
  function createSprite(name, opt) {
    var sprite = new PIXI.Sprite.fromImage(imgRoot + name);
    if (opt) {
      _.forIn(opt, function(value, key) {
          sprite[key] = value;
      });
    }
    return sprite;
  }
  // 触发一次
  function fireOnce(name, evt) {
    if(firedEvents.indexOf(name) > -1) {
      return
    } else {
      evt && evt()
      firedEvents.push(name)
    }
  }
  // 计算场景初始位置
  function stagePosition(index) {
    var h = 0;
    var arr = _.take(stages, index)
    _.forEach(arr, function(stageHeight) {
      h += stageHeight
    })
    return h
  }

  return {
    createAnimatedSprite: createAnimatedSprite,
    createContainer: createContainer,
    createHintContainer: createHintContainer,
    createSprite: createSprite,
    fireOnce: fireOnce,
    stagePosition: stagePosition
  }
})()

// 启动
$(function() {
  // 阻止默认触摸事件
  $(document).bind("touchmove",function(e){
    e.preventDefault();
  });

  //
  PIXI.AUTO_PREVENT_DEFAULT = false

  // Aliases
  window.createContainer = SOLWAY.Utils.createContainer;
  window.createHintContainer = SOLWAY.Utils.createHintContainer;
  window.createSprite = SOLWAY.Utils.createSprite;
  window.createAnimatedSprite = SOLWAY.Utils.createAnimatedSprite;
  window.stagePosition = SOLWAY.Utils.stagePosition;

  window.showVideo = SOLWAY.Video.show;
  window.hideVideo = SOLWAY.Video.hide;

  // Loading载入
	SOLWAY.Loader.init();
});
