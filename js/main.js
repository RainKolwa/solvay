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
  "scene-6-hand-3.png",
  "scene-6-hand-4.png",
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
  "scene-8-light-1.png",
  "poster.jpg",
  "scene-10-bg.jpg",
  "scene-10-text.png",
  "scene-10-word-1.png",
  "scene-10-word-2.png",
  "scene-10-word-3.png",
  "scene-10-word-4.png",
  "scene-10-word-5.png",
  "scene-10-word-6.png"
];
var SOLWAY = window.SOLWAY || {};
SOLWAY.Scene = [];

var app; // 舞台
var container; // 舞台容器
var scroller; // 滚动模块
var firedEvents = []; // 记录场景进度
var clickGroup; // 可点击层
var stages = [1355, 575, 1185, 1270, 1118, 1329, 2040, 3150, 1173, 1075]; // 场景节点
var tapping = false; // 是否点击
var windowHeight = window.innerHeight;

var useCDN = true;
var cdn = "http://static-solvay.uice.lu";
var imgRoot = useCDN ? cdn + '/images/' : "../images/";
var videoRoot = useCDN ? cdn + '/source/' : "./source/";
var apiRoot = "http://solvay.uice.lu/";
var shareImg = apiRoot + "images/share.jpg?v=1";

SOLWAY.Loader = (function() {
  var loading = $(".loading");
  var main = $(".main");

  function init() {
    // init app
    app = new PIXI.Application(640, windowHeight, {
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
      return imgRoot + img;
    });
    PIXI.loader
      .add(assets)
      .on("progress", loadProgressHandler)
      .load(setup);
  }

  function loadProgressHandler(loader) {
    var percentage = loader.progress;
    var progressHeight = Math.ceil(192 * percentage / 100) + "px";
    loading
      .find(".container span")
      .eq(1)
      .css({ width: progressHeight });
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
  };
})();

SOLWAY.Main = (function() {
  function init() {
    for (var i = 0; i < SOLWAY.Scene.length; i++) {
      var s = SOLWAY.Scene[i].init();
      container.addChild(s);
    }

    var curtain = SOLWAY.Curtain.init();
    container.addChild(curtain);

    // SOLWAY.Scroller.init(container);

    // scrollTo
    // scroller.scrollTo(0, stagePosition(3));

    // -- add scene
    // container.addChild(scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9);
    app.stage.addChild(container);
  }

  return {
    init: init
  };
})();

// -----------------转场动画----------------- //
SOLWAY.Curtain = (function() {
  var scene, cloud, cloud_mini, bottle_left, bottle_right, tl;

  function init() {
    var curtainY = 1 / 2 * windowHeight - 1 / 2 * 837;
    scene = createContainer({ x: 0, y: curtainY });
    cloud = createSprite("curtain-cloud.png", { x: 308, y: 0, alpha: 0 });
    cloud_mini = createSprite("curtain-cloud-mini.png", {
      x: 139,
      y: 223,
      alpha: 0
    });
    bottle_left = createSprite("curtain-bottle-left.png", {
      x: 0,
      y: 0,
      alpha: 0
    });
    bottle_right = createSprite("curtain-bottle-right.png", {
      x: 0,
      y: 381,
      alpha: 0
    });

    // reset state
    bottle_left.y -= 100;
    bottle_right.y += 100;
    cloud.x = 332 + 308;
    cloud.y = 413;
    cloud.pivot.set(332, 413);

    // add containers to scene
    scene.addChild(cloud_mini, bottle_left, bottle_right, cloud);
    // return scene
    return scene;
  }

  function clearTl() {
    tl.pause(0, true); //Go back to the start (true is to suppress events)
    tl.remove();
  }

  function anim(cb) {
    tl = new TimelineLite();
    tl.to(bottle_left, 0.5, { y: "+=100", alpha: 1 });
    tl.to(bottle_right, 0.5, { y: "-=100", alpha: 1 }, "-=0.5");
    tl.to(cloud_mini, 1, { alpha: 1 });
    tl.to(cloud, 1, { alpha: 1 }, "-=.5");
    tl.to(cloud.scale, 1, { x: 3, y: 3, onComplete: cb }, "-=1");
    tl.to(cloud, 1, { alpha: 0 });
    tl.to(bottle_left, 1, { alpha: 0 }, "-=1");
    tl.to(bottle_right, 1, { alpha: 0 }, "-=1");
    tl.to(cloud_mini, 1, { alpha: 0, onComplete: clearTl }, "-=1");
  }

  return {
    init: init,
    anim: anim
  };
})();

// -----------------场景1----------------- //
SOLWAY.Scene[0] = (function() {
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
    var logoY = 1 / 2 * windowHeight - 1 / 2 * 742;
    var buttonY = 1 / 2 * windowHeight - 1 / 2 * 387;
    scene = createContainer({ x: 0, y: 0 });
    logo = createContainer({ x: 254, y: logoY });
    bg = createSprite("scene-1-bg.jpg");
    button = createContainer({ x: 124, y: buttonY, interactive: true });
    // button.displayGroup = clickGroup;

    logoText1 = createSprite("logo-word-1.png", { x: 16, y: 0 });
    logoText2 = createSprite("logo-word-2.png", { x: 27, y: 132 });
    logoText3 = createSprite("logo-word-3.png", { x: 27, y: 268 });
    logoText4 = createSprite("logo-word-4.png", { x: 25, y: 453 });
    logoText5 = createSprite("logo-word-5.png", { x: 0, y: 584 });
    var btnText = createSprite("btn-start.png", { x: 2, y: 13 });
    var btnShadow = createSprite("btn-start-shadow.png", { x: 0, y: 0 });

    // add sprite to container
    logo.addChild(logoText1, logoText2, logoText3, logoText4, logoText5);
    button.addChild(btnShadow, btnText);
    // add containers to scene
    scene.addChild(bg, logo, button);
    // animation
    anim();
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.staggerFrom(
      [logoText1, logoText2, logoText3, logoText4, logoText5],
      0.5,
      { alpha: 0, x: "+=40", ease: Back.easeInOut },
      0.2
    );
    TweenMax.from(button, 0.5, { x: "-=20", alpha: 0 }).delay(1);
  }

  function actionMv() {
    SOLWAY.Scroller.init(container);
    scroller.scrollTo(0, stagePosition(1) - 200);
  }

  function bindEvents() {
    button.on("pointertap", function() {
      SOLWAY.Curtain.anim(actionMv);
      trackEvent("开始", "点击");
    });
  }

  return {
    init: init,
    anim: anim
  };
})();

// -----------------场景2----------------- //
SOLWAY.Scene[1] = (function() {
  var scene, bg, text, windows, family, mother, father, child;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(1) });
    bg = createSprite("scene-2-bg.jpg");
    windows = createSprite("window.png", { x: 87, y: 0 });
    text = createSprite("text-2-1.png", { x: 163, y: 104, alpha: 0 });
    family = createContainer({ x: 290, y: 73 });
    mother = createSprite("mother.png", { x: -10, y: -5 });
    father = createSprite("father.png", { x: -10, y: 81 });
    child = createSprite("child.png", { x: 28, y: 78 });

    // reset state
    text.x -= 20;
    child.x += 1 / 2 * child.width;
    child.y += 1 / 2 * child.height;
    child.anchor.set(0.5, 0.5);

    // add sprite to container
    family.addChild(father, mother, child);
    // add containers to scene
    scene.addChild(bg, family, windows, text);
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.from(child, 1, {
      rotation: 5 * Math.PI / 180,
      repeat: -1,
      yoyo: true,
      ease: Linear.easeNone
    });
  }

  function customAnim() {
    TweenMax.to(text, 0.4, {
      x: "+=20",
      alpha: 1
    });
    // CustomWiggle.create("demoWiggle", {wiggles:8});
    // var tl = new TimelineMax();
    // tl.to(text, 0.15, {scale:0.90, rotation:-8});
    // tl.to(text, 0.15, {scale:1.2, rotation:0, ease:Linear.easeNone}, "+=0.1");
    // tl.to(text, 0.75, {rotation:3, ease:"demoWiggle"});
    // tl.to(text, 0.15, {scale:1});
    // tl.play();
  }

  function bindEvents() {
    TweenMax.from(text, 0.6, { x: "-=20", alpha: 0 });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景3----------------- //
SOLWAY.Scene[2] = (function() {
  var scene,
    bg,
    blackboard,
    book,
    chair,
    equipment,
    light,
    smoke,
    man,
    hand,
    drop,
    text,
    hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(2) });
    bg = createSprite("scene-3-bg.jpg");
    blackboard = createSprite("scene-3-blackboard.png", { x: 46, y: 461 });
    book = createSprite("scene-3-book.png", { x: 0, y: 975 });
    chair = createSprite("scene-3-chair.png", { x: 0, y: 757 });
    equipment = createSprite("scene-3-equipment.png", { x: 3, y: 504 });
    light = createSprite("scene-3-light.png", { x: 351, y: 445 });
    smoke = createSprite("scene-3-smoke.png", { x: 405, y: 806 });
    text = createSprite("text-3-1.png", { x: 96, y: 304, alpha: 0 });
    man = createContainer({ x: 4, y: 739, interactive: true });
    hint = createHintContainer({ x: 282, y: 631 });

    var body = createSprite("scene-3-body.png", { x: 0, y: 0 });
    hand = createSprite("scene-3-hand.png", { x: 230, y: 0 });
    drop = createSprite("scene-3-drop.png", {
      x: 273,
      y: 46,
      scaleY: 0,
      alpha: 0
    });

    // reset state
    text.x -= 20;

    // add sprite to container
    man.addChild(body, hand, drop);
    // add containers to scene
    scene.addChild(
      bg,
      blackboard,
      light,
      equipment,
      chair,
      smoke,
      book,
      man,
      text,
      hint
    );
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.to(hand, 1, {
      rotation: 5 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(drop, 1, {
      x: "-=5",
      y: "+=5",
      yoyo: true,
      alpha: 1,
      scaleY: 1,
      repeat: -1
    });
    TweenMax.to(smoke, 2, {
      x: "+=60",
      alpha: 0,
      scaleY: 1,
      repeat: -1
    });
  }

  function customAnim() {
    TweenMax.to(text, 0.4, {
      x: "+=20",
      alpha: 1
    });
  }

  function bindEvents() {
    man.on("pointertap", function() {
      showVideo("1.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("1.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景4----------------- //
SOLWAY.Scene[3] = (function() {
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
    bg = createSprite("scene-4-bg.jpg", { x: 0, y: 0 });
    clock_hour = createSprite("scene-4-clock-hour.png", { x: 133, y: 598 });
    clock_minute = createSprite("scene-4-clock-minute.png", { x: 305, y: 294 });
    door_closed = createSprite("scene-4-door-closed.png", { x: 35, y: 521 });
    door_opened = createSprite("scene-4-door-opened.png", {
      x: 35,
      y: 521,
      alpha: 0
    });
    factory = createSprite("scene-4-factory.png", { x: 8, y: 256 });
    man_left = createSprite("scene-4-man-left.png", { x: 0, y: 61, alpha: 0 });
    man_middle = createSprite("scene-4-man-middle.png", {
      x: 0,
      y: 253,
      interactive: true,
      alpha: 0
    });
    man_right = createSprite("scene-4-man-right.png", {
      x: 0,
      y: 408,
      alpha: 0
    });
    men_1 = createSprite("scene-4-men-1.png", { x: 22, y: 579, alpha: 0 });
    men_2 = createSprite("scene-4-men-2.png", { x: 0, y: 794, alpha: 0 });
    text_1 = createSprite("text-4-1.png", { x: 473, y: 531, alpha: 0 });
    text_2 = createSprite("text-4-2.png", { x: 372, y: 0, alpha: 0 });
    text_3 = createSprite("text-4-3.png", { x: 388, y: 288, alpha: 0 });
    text_4 = createSprite("text-4-4.png", { x: 200, y: 549, alpha: 0 });
    hint = createHintContainer({ x: 137, y: 205, alpha: 0 });

    // reset state
    text_1.x -= 10;
    text_2.x -= 10;
    text_3.x -= 10;
    text_4.x -= 10;
    man_left.y -= 10;
    man_middle.y -= 10;
    man_right.y -= 10;
    clock_hour.x += 230;
    clock_hour.y += 41;
    clock_hour.pivot.set(230, 41);
    clock_minute.x += 47;
    clock_minute.y += 346;
    clock_minute.pivot.set(47, 346);
    // 早九晚五
    clock_hour.rotation = 138 * Math.PI / 180;
    clock_minute.rotation = 55 * Math.PI / 180;

    // add sprite to container
    // man.addChild(body, hand, drop)
    // add containers to scene
    scene.addChild(
      bg,
      clock_hour,
      clock_minute,
      factory,
      door_closed,
      door_opened,
      men_1,
      men_2,
      man_left,
      man_middle,
      man_right,
      text_1,
      text_2,
      text_3,
      text_4,
      hint
    );
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {}

  function customAnim() {
    var tl = new TimelineLite();
    tl.to(clock_hour, 5, {
      rotation: 240 * Math.PI / 180 + 120 * Math.PI / 180,
      ease: Linear.easeNone
    });
    tl.to(text_1, 0.2, {
      x: "+=20",
      alpha: 1
    });
    tl.to(
      clock_minute,
      5,
      {
        rotation: 360 * 8 * Math.PI / 180 + 55 * Math.PI / 180,
        ease: Linear.easeNone
      },
      "-=5"
    );
    tl.to(door_closed, 0.2, { alpha: 0 });
    tl.to(door_opened, 0.2, { alpha: 1 });
    tl.to(men_2, 0.2, { alpha: 1 });
    tl.to(men_1, 0.2, { alpha: 1 });
    tl.to(man_left, 0.2, {
      y: "+=10",
      alpha: 1
    });
    tl.to(text_2, 0.2, {
      x: "+=20",
      alpha: 1
    });
    tl.to(man_middle, 0.2, {
      y: "+=10",
      alpha: 1
    });
    tl.to(text_3, 0.2, {
      x: "+=20",
      alpha: 1
    });
    tl.to(man_right, 0.2, {
      y: "+=10",
      alpha: 1
    });
    tl.to(text_4, 0.2, {
      x: "+=20",
      alpha: 1
    });
    tl.to(hint, 0.2, {
      alpha: 1
    });
  }

  function bindEvents() {
    man_middle.on("pointertap", function() {
      showVideo("2.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("2.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景5----------------- //
SOLWAY.Scene[4] = (function() {
  var scene, bg, text, body, head, hand, hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(4) });
    bg = createSprite("scene-5-bg.jpg", { x: 0, y: 0 });
    text = createSprite("text-5-1.png", { x: 456, y: 334, alpha: 0 });
    body = createSprite("scene-5-body.png", { x: 0, y: 0, interactive: true });
    head = createSprite("scene-5-head.png", { x: 359, y: 67 });
    head.x += 1 / 2 * head.width;
    head.y += 1 / 2 * head.height;
    head.anchor.set(0.5, 0.5);
    hand = createSprite("scene-5-hand.png", { x: 119, y: 603 });
    hand.x += 1 * hand.width;
    hand.y += 1 * hand.height;
    hand.anchor.set(1, 1);
    hint = createHintContainer({ x: 225, y: 340 });

    // reset state
    text.x -= 20;

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, body, head, hand, text, hint);
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.to(hand, 1, {
      rotation: -10 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(head, 1, {
      rotation: 5 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
  }

  function customAnim() {
    TweenMax.to(text, 0.4, {
      x: "+=20",
      alpha: 1
    });
  }

  function bindEvents() {
    body.on("pointertap", function() {
      showVideo("3.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("3.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景6----------------- //
SOLWAY.Scene[5] = (function() {
  var scene,
    bg,
    blackboard,
    photo,
    hint,
    text_1,
    text_2,
    hand_1,
    hand_2,
    hand_3,
    hand_4;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(5) });
    bg = createSprite("scene-6-bg.jpg", { x: 0, y: 0 });
    blackboard = createSprite("scene-6-blackboard.png", { x: 15, y: 487 });
    hand_1 = createSprite("scene-6-hand-1.png", { x: 226, y: 487 + 114 });
    hand_2 = createSprite("scene-6-hand-2.png", { x: 224, y: 487 + 309 });
    hand_3 = createSprite("scene-6-hand-3.png", { x: 292, y: 487 + 592 });
    hand_4 = createSprite("scene-6-hand-4.png", { x: 303, y: 487 + 673 });
    photo = createSprite("scene-6-photo.png", {
      x: 95,
      y: -64,
      interactive: true
    });
    hint = createHintContainer({ x: 323, y: -9 });
    text_1 = createSprite("text-6-1.png", { x: 550, y: 1, alpha: 0 });
    text_2 = createSprite("text-6-2.png", { x: 500, y: 680, alpha: 0 });

    // reset state
    text_1.x -= 20;
    text_2.x -= 20;
    hand_1.x += 1 * hand_1.width;
    hand_1.y += 1 * hand_1.height;
    hand_1.anchor.set(1);
    hand_2.x += 0 * hand_2.width;
    hand_2.y += 0.5 * hand_2.height;
    hand_2.anchor.set(0, 0.5);
    hand_3.x += 0 * hand_3.width;
    hand_3.y += 17;
    hand_3.pivot.set(0, 17);
    hand_4.x += 10;
    hand_4.y += 71;
    hand_4.pivot.set(10, 71);
    // add sprite to container
    // add containers to scene
    scene.addChild(
      bg,
      photo,
      blackboard,
      hand_1,
      hand_2,
      hand_3,
      hand_4,
      text_1,
      text_2,
      hint
    );
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.to(hand_1, 0.5, {
      rotation: -20 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_2, 1, {
      rotation: -10 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_3, 1, {
      rotation: -10 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_4, 2, {
      rotation: 8 * Math.PI / 180,
      repeat: -1,
      yoyo: true,
      ease: Linear.easeNone
    });
  }

  function customAnim() {
    TweenMax.to(text_1, 0.4, {
      x: "+=20",
      alpha: 1
    });
    TweenMax.to(text_2, 0.4, {
      x: "+=20",
      alpha: 1,
      delay: 1
    });
  }

  function bindEvents() {
    photo.on("pointertap", function() {
      showVideo("4.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("4.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景7----------------- //
SOLWAY.Scene[6] = (function() {
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
    bg = createSprite("scene-7-bg.jpg", { x: 0, y: 0 });
    building = createSprite("scene-7-building.png", { x: 15, y: 853 });
    flag = createSprite("scene-7-flag.png", { x: 0, y: 572 });
    map_building = createSprite("scene-7-map-building.png", {
      x: 280,
      y: 313,
      interactive: true
    });
    map = createSprite("scene-7-map.png", { x: 95, y: 0 });
    shanghai = createSprite("scene-7-shanghai.png", { x: 269, y: 414 });
    text_1 = createSprite("text-7-1.png", { x: 24, y: 75, alpha: 0 });
    text_2 = createSprite("text-7-2.png", { x: 517, y: 843, alpha: 0 });
    hint = createHintContainer({ x: 320, y: 184 });

    // reset state
    map_building.x += 0 * map_building.width;
    map_building.y += 1 * map_building.height;
    map_building.alpha = 0;
    map_building.anchor.set(0, 1);
    map_building.scale.x = 2;
    map_building.scale.y = 2;
    shanghai.alpha = 0;
    shanghai.scale.x = 0;
    shanghai.scale.y = 0;
    text_1.x -= 20;
    text_2.x -= 20;

    // add sprite to container
    // add containers to scene
    scene.addChild(
      bg,
      map,
      map_building,
      shanghai,
      building,
      flag,
      text_1,
      text_2,
      hint
    );
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {}

  function customAnim() {
    TweenMax.to(map_building.scale, 0.5, {
      x: 1,
      y: 1
    });
    TweenMax.to(map_building, 0.5, {
      alpha: 1
    });
    TweenMax.to(shanghai.scale, 0.2, {
      x: 1,
      y: 1
    });
    TweenMax.to(shanghai, 0.5, {
      alpha: 1,
      ease: Elastic.easeOut
    });
    TweenMax.to(text_1, 0.4, {
      x: "+=20",
      alpha: 1
    });
    TweenMax.to(text_2, 0.4, {
      x: "+=20",
      alpha: 1,
      delay: 1
    });
  }

  function bindEvents() {
    map_building.on("pointerdown", function() {
      showVideo("5.mp4");
    });
    hint.on("pointerdown", function() {
      showVideo("5.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景8----------------- //
SOLWAY.Scene[7] = (function() {
  var scene,
    bg,
    dancer,
    king_hand,
    king,
    light,
    light_1,
    light_2,
    light_3,
    light_4,
    light_5,
    queen_hand,
    queen,
    sunny,
    text_1,
    text_2,
    hand_1,
    hand_2,
    hand_3,
    hint,
    hint2;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(7) });
    bg = createSprite("scene-8-bg.jpg", { x: 0, y: 0 });
    dancer = createSprite("scene-8-dancer.png", { x: 344, y: 613 });
    king_hand = createSprite("scene-8-king-hand.png", { x: 84, y: 978 });
    king = createSprite("scene-8-king.png", {
      x: 0,
      y: 925,
      interactive: true
    });
    queen_hand = createSprite("scene-8-queen-hand.png", { x: 61, y: 1188 });
    queen = createSprite("scene-8-queen.png", { x: 0, y: 1129 });
    text_1 = createSprite("text-8-1.png", { x: 74, y: 372, alpha: 0 });
    text_2 = createSprite("text-8-2.png", { x: 351, y: 1910, alpha: 0 });
    sunny = createContainer({ x: 0, y: 1595, interactive: true });
    var ship = createSprite("scene-8-sunshine.png", { x: 0, y: 0 });
    var body = createSprite("scene-8-body.png", { x: 0, y: 108 });
    hand_1 = createSprite("scene-8-hand-1.png", { x: 215, y: 181 });
    hand_2 = createSprite("scene-8-hand-2.png", { x: 435, y: 860 });
    hand_3 = createSprite("scene-8-hand-3.png", { x: 307, y: 945 });
    light = createContainer();
    light_1 = createSprite("scene-8-light-1.png", { x: 0, y: 63 });
    light_2 = createSprite("scene-8-light-2.png", { x: 0, y: 40 });
    light_3 = createSprite("scene-8-light-3.png", { x: 0, y: 627 });
    light_4 = createSprite("scene-8-light-4.png", { x: 0, y: 740 });
    light_5 = createSprite("scene-8-light-5.png", { x: 0, y: 1231 });
    hint = createHintContainer({ x: 218, y: 887 });
    hint2 = createHintContainer({ x: 453, y: 605 });

    // reset state
    light_1.alpha = 0;
    light_2.alpha = 0;
    light_3.alpha = 0;
    light_4.alpha = 0;
    light_5.alpha = 0;
    king_hand.x += 0 * king_hand.width;
    king_hand.y += 1 * king_hand.height;
    king_hand.anchor.set(0, 1);
    queen_hand.x += 0 * queen_hand.width;
    queen_hand.y += 1 * queen_hand.height;
    queen_hand.anchor.set(0, 1);
    text_1.x -= 20;
    text_2.x -= 20;

    // add sprite to container
    light.addChild(light_1, light_2, light_3, light_4, light_5);
    sunny.addChild(ship, body, hand_1, hand_2, hand_3, hint2);
    // add containers to scene
    scene.addChild(
      bg,
      dancer,
      light,
      king,
      king_hand,
      queen,
      queen_hand,
      sunny,
      text_1,
      text_2,
      hint
    );
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
    TweenMax.to([light_1, light_3, light_5], 1, {
      alpha: 1,
      repeat: -1,
      yoyo: true
    }).delay(1);
    TweenMax.to([light_2, light_4], 1, {
      alpha: 1,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to([king_hand, queen_hand], 0.2, {
      rotation: -5 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_1, 0.8, {
      rotation: -10 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_2, 0.8, {
      rotation: -5 * Math.PI / 180,
      repeat: -1,
      yoyo: true
    });
    TweenMax.to(hand_3, 0.5, {
      rotation: -10 * Math.PI / 180,
      repeat: -1,
      yoyo: true,
      ease: Linear.easeNone
    });
  }

  function customAnim() {
    TweenMax.to(text_1, 0.4, {
      x: "+=20",
      alpha: 1
    });
    TweenMax.to(text_2, 0.4, {
      x: "+=20",
      alpha: 1,
      delay: 2
    });
  }

  function bindEvents() {
    king.on("pointertap", function() {
      showVideo("6.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("6.mp4");
    });
    sunny.on("pointertap", function() {
      showVideo("7.mp4");
    });
    hint2.on("pointertap", function() {
      showVideo("7.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景9----------------- //
SOLWAY.Scene[8] = (function() {
  var scene, bg, banner, people, text, hint;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(8) });
    bg = createSprite("scene-9-bg.jpg", { x: 0, y: 0 });
    banner = createSprite("scene-9-banner.png", {
      x: 431,
      y: 56-157,
      interactive: true
    });
    people = createSprite("scene-9-people.png", { x: 0, y: 194-157, interactive: true });
    text = createSprite("text-9-1.png", { x: 26, y: 463-157, alpha: 0 });
    hint = createHintContainer({ x: 340, y: 35-157+40 });

    // reset state
    banner.x += 0.5 * banner.width;
    banner.y += 0.5 * banner.height;
    banner.anchor.set(0.5);
    banner.scale.x = 0;
    banner.scale.y = 0;
    text.x -= 20;

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, banner, people, text, hint);
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {}

  function customAnim() {
    TweenMax.to(banner.scale, 0.5, {
      x: 1,
      y: 1,
      ease: Back.easeOut
    });
    TweenMax.to(text, 0.4, {
      x: "+=20",
      alpha: 1
    });
  }

  function bindEvents() {
    banner.on("pointertap", function() {
      showVideo("8.mp4");
    });
    people.on("pointertap", function() {
      showVideo("8.mp4");
    });
    hint.on("pointertap", function() {
      showVideo("8.mp4");
    });
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------场景10----------------- //
SOLWAY.Scene[9] = (function() {
  var scene, bg, text, word1, word2, word3, word4, word5, word6;

  function init() {
    scene = createContainer({ x: 0, y: stagePosition(9) });
    bg = createSprite("scene-10-bg.jpg", { x: 0, y: 0 });
    word1 = createSprite("scene-10-word-1.png", { x:305, y:123, alpha:0 });
    word2 = createSprite("scene-10-word-2.png", { x:301, y:273, alpha:0 });
    word3 = createSprite("scene-10-word-3.png", { x:305, y:390, alpha:0 });
    word4 = createSprite("scene-10-word-4.png", { x:317, y:518, alpha:0 });
    word5 = createSprite("scene-10-word-5.png", { x:310, y:635, alpha:0 });
    word6 = createSprite("scene-10-word-6.png", { x:311, y:766, alpha:0 });
    text = createSprite("scene-10-text.png", { x: 152, y: 140, alpha: 0 });

    // reset state
    text.x -= 20;
    word1.x += 40;
    word2.x += 40;
    word3.x += 40;
    word4.x += 40;
    word5.x += 40;
    word6.x += 40;

    // add sprite to container
    // add containers to scene
    scene.addChild(bg, text, word1, word2, word3, word4, word5, word6);
    // bind events
    bindEvents();
    // return scene
    return scene;
  }

  function anim() {
  }

  function customAnim() {

    TweenMax.staggerTo(
      [word1, word2, word3, word4, word5, word6],
      0.5,
      { alpha: 1, x: "-=40", ease: Back.easeInOut },
      0.2
    );
    TweenMax.to(text, 0.8, {
      x: "+=20",
      alpha: 1
    }).delay(1.2);
  }

  function bindEvents() {
  }

  return {
    init: init,
    anim: anim,
    customAnim: customAnim
  };
})();

// -----------------滚动条实例----------------- //
SOLWAY.Scroller = (function(container) {
  function init(container) {
    scroller = new Scroller(
      function(left, top, zoom) {
        container.y = -top;

        for (var i = 1; i < stages.length; i++) {
          // 通用入场
          if (top > stagePosition(i) - windowHeight) {
            fireOnce("scene" + i, function() {
              SOLWAY.Scene[i].anim && SOLWAY.Scene[i].anim();
            });
          }
          // 定制入场
          if (top > stagePosition(i) - windowHeight + 500) {
            fireOnce("scene" + i + "_custom", function() {
              SOLWAY.Scene[i].customAnim && SOLWAY.Scene[i].customAnim();
            });
          }
        }
      },
      {
        zooming: true,
        bouncing: false
      }
    );
    var stageHeight = stagePosition(stages.length);
    scroller.setDimensions(
      app.view.width,
      app.view.height,
      app.view.height,
      stageHeight
    );

    var mousedown = false;
    var y1,y2;
    document.addEventListener(
      "touchstart",
      function(e) {
        scroller.doTouchStart(e.touches, e.timeStamp);
        y1 = container.y;
      },
      false
    );

    document.addEventListener(
      "touchmove",
      function(e) {
        scroller.doTouchMove(e.touches, e.timeStamp);
      },
      false
    );

    document.addEventListener(
      "touchend",
      function(e) {
        scroller.doTouchEnd(e.timeStamp);
        y2 = container.y;
        if(Math.abs(parseInt(y2)-parseInt(y1)) < 10) {
          tapping = true;
        } else {
          tapping = false;
        }
      },
      false
    );
  }

  return {
    init: init
  };
})();

// -----------------视频实例----------------- //
SOLWAY.Video = (function() {
  var video = $(".video-container"),
    tl,
    mask = video.find(".mask"),
    closeBtn = video.find(".btn-close"),
    videoBox = video.find(".video");

  function init() {
    // reset state
    TweenLite.set(mask, { top: "100%", left: 0, alpha: 0 });
    TweenLite.set(videoBox, { scale: 0 });

    // define timeline
    tl = new TimelineLite({ paused: true });
    tl.to([ mask, video ], 0.2, { top: 0, alpha: 1 });
    tl.to(videoBox, 0.5, { scale: 1, ease: Back.easeOut });
    bindEvents();
  }

  function show(src) {
    setTimeout(function() {
      if (tapping) {
        tl.play();
        // attach video source
        videoBox.find('video').attr('src', videoRoot + src);
        videojs('video', {
          controls: true,
          width: 720 * 1.2,
          poster: imgRoot + 'poster.jpg'
        })
        // stop bgm
        pauseBgm();
        // track data
        trackEvent('视频', '播放', src);
      }
    }, 100)
  }

  function hide() {
    tl.reverse();
    setTimeout(function() {
      if (video.find("video")) {
        video.find("video").attr("src", "");
        // start bgm
        playBgm();
      }
    }, 700)
  }

  function bindEvents() {
    video.on("click", ".btn-close", function() {
      hide();
    });
  }

  return {
    init: init,
    show: show,
    hide: hide
  };
})();

// -----------------BGM实例----------------- //
SOLWAY.BGM = (function() {
  var audio = document.getElementById("bgmusic"),
    switcher = $(".switcher");

  function init() {
    bindEvents();
  }

  function play() {
    audio && audio.play();
    switcher.addClass('pause');
  }

  function pause() {
    if(audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    switcher.removeClass('pause');
  }

  function autoPlay(id) {
    var play = function() {
      audio.play();
      document.removeEventListener("touchstart", play, false);
    };
    audio.play();
    document.addEventListener("touchstart", play, false);
  }

  function bindEvents() {
    // click event
    switcher.on("click", function(e) {
      e.preventDefault();
      if ($(this).hasClass("pause")) {
        pause();
        // track data
        trackEvent('BGM开关', '关闭');
      } else {
        play();
        // track data
        trackEvent('BGM开关', '打开');
      }
      // $(this).toggleClass("pause");
    });

    // autoplay hack
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        SOLWAY.BGM.autoPlay("bgmusic");
      },
      false
    );
    document.addEventListener(
      "YixinJSBridgeReady",
      function() {
        SOLWAY.BGM.autoPlay("bgmusic");
      },
      false
    );
  }

  return {
    init: init,
    play: play,
    pause: pause,
    autoPlay: autoPlay
  };
})();

// -----------------通用方法----------------- //
SOLWAY.Utils = (function() {
  // 帧动画
  function createAnimatedSprite(name, num, opt, start) {
    var textureArray = [];
    for (let i = 0; i < num; i++) {
      var texture = PIXI.Texture.fromImage(name + i + ".png");
      textureArray.push(texture);
    }
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
    var hint_hand = createSprite("hand.png", { x: 54, y: 43 });
    var hint_bg = createSprite("hand-bg.png", { x: 0, y: 0 });
    _container.addChild(hint_bg, hint_hand);
    if (opt) {
      _.forIn(opt, function(value, key) {
        _container[key] = value;
      });
    }
    _container.interactive = true;
    // add animation
    TweenMax.to(_container, 0.3, { x: "+=10", y: "-=10", yoyo: true }).repeat(
      -1
    );
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
    if (firedEvents.indexOf(name) > -1) {
      return;
    } else {
      evt && evt();
      firedEvents.push(name);
    }
  }
  // 计算场景初始位置
  function stagePosition(index) {
    var h = 0;
    var arr = _.take(stages, index);
    _.forEach(arr, function(stageHeight) {
      h += stageHeight;
    });
    return h;
  }
  // 微信分享
  function setWechatShare(data) {
    var title = data.title;
    var desc = data.desc;
    var imgUrl = shareImg;
    var link = window.location.href;

    wx.onMenuShareTimeline({
      title: desc,
      link: link,
      imgUrl: imgUrl,
      success: function() {
        // 用户确认分享后执行的回调函数
        trackEvent('朋友圈', '分享');
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
        trackEvent('朋友圈', '取消分享');
      }
    });
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: function() {
        // 用户确认分享后执行的回调函数
        trackEvent('朋友', '分享');
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
        trackEvent('朋友', '取消分享');
      }
    });
  }

  // 统计页面
  function trackPageview(path) {
    _hmt.push(["_trackPageview", path]);
  }

  // 统计事件
  function trackEvent(category, action, opt_label, opt_value) {
    _hmt.push(["_trackEvent", category, action, opt_label, opt_value]);
  }


  return {
    createAnimatedSprite: createAnimatedSprite,
    createContainer: createContainer,
    createHintContainer: createHintContainer,
    createSprite: createSprite,
    fireOnce: fireOnce,
    stagePosition: stagePosition,
    setWechatShare: setWechatShare,
    trackEvent: trackEvent,
    trackPageview: trackPageview
  };
})();

// 启动
$(function() {
  // auto play in wechat
  SOLWAY.BGM.init();
  // init video
  SOLWAY.Video.init();

  // wechat config
  $.ajax({
    url: "http://solvay.uice.lu/jsapi_args.php",
    method: "get",
    success: function(res) {
      wx.config({
        debug: false,
        appId: res.appId,
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
      });
      wx.ready(function() {
        SOLWAY.Utils.setWechatShare({
          title: "索尔维传奇",
          desc: "发明氨碱法，比肩诺贝尔，他的公司在150多年里改变着世界"
        });
      });
    }
  });

  // 阻止默认触摸事件
  $(document).bind("touchmove", function(e) {
    e.preventDefault();
  });

  //
  // PIXI.AUTO_PREVENT_DEFAULT = false

  // Aliases
  window.createContainer = SOLWAY.Utils.createContainer;
  window.createHintContainer = SOLWAY.Utils.createHintContainer;
  window.createSprite = SOLWAY.Utils.createSprite;
  window.createAnimatedSprite = SOLWAY.Utils.createAnimatedSprite;
  window.fireOnce = SOLWAY.Utils.fireOnce;
  window.stagePosition = SOLWAY.Utils.stagePosition;
  window.trackPageview = SOLWAY.Utils.trackPageview;
  window.trackEvent = SOLWAY.Utils.trackEvent;

  window.showVideo = SOLWAY.Video.show;
  window.hideVideo = SOLWAY.Video.hide;

  window.pauseBgm = SOLWAY.BGM.pause;
  window.playBgm = SOLWAY.BGM.play;

  // reset main container height and bgm button position
  $(".main").height(windowHeight);
  $(".switcher").css("top", windowHeight - 20 - 120 + "px");

  // showVideo('1.mp4')

  // Loading载入
  SOLWAY.Loader.init();
});
