'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var core = require('@material-ui/core');
var icons = require('@material-ui/icons');
var lab = require('@material-ui/lab');
var css = _interopDefault(require('classnames'));
var React = require('react');
var React__default = _interopDefault(React);
var colorManipulator = require('@material-ui/core/styles/colorManipulator');

const getColor = (theme, type, opacity) => {
  const color = theme.palette[type][theme.palette.type === 'light' ? 'main' : 'dark'];

  if (!opacity) {
    return color;
  }

  return colorManipulator.lighten(color, opacity);
};

const getGreyColor = (theme, opacity) => {
  const greyColor = theme.palette.grey['500'];

  if (!opacity) {
    return greyColor;
  }

  return colorManipulator.lighten(greyColor, opacity);
};

var styles = (theme => ({
  'player-container': {
    padding: theme.spacing.unit
  },
  'player-default-icon': {
    padding: '0px',
    margin: '0px',
    width: '27px',
    height: '27px',
    fill: `${getColor(theme, 'primary')} !important`,
    color: `${getColor(theme, 'primary')} !important`,
    '&:hover': {
      fill: `${getColor(theme, 'primary', 0.25)} !important`,
      color: `${getColor(theme, 'primary', 0.25)} !important`
    }
  },
  'player-icon-disabled': {
    padding: '0px',
    margin: '0px',
    width: '27px',
    height: '27px',
    fill: getGreyColor(theme),
    color: getGreyColor(theme),
    '&:hover': {
      fill: getGreyColor(theme, 0.25),
      color: getGreyColor(theme, 0.25)
    }
  },
  'player-main-icon': {
    fill: `${getColor(theme, 'secondary')} !important`,
    color: `${getColor(theme, 'secondary')} !important`,
    '&:hover': {
      fill: `${getColor(theme, 'secondary', 0.25)} !important`,
      color: `${getColor(theme, 'secondary', 0.25)} !important`
    }
  },
  'player-slider-container': {
    width: 'auto !important',
    'border-radius': '4px'
  },
  'player-slider-track': {
    'background-color': getColor(theme, 'primary')
  },
  'player-slider-thumb': {
    'background-color': getColor(theme, 'secondary')
  },
  'player-text': {
    color: theme.palette.getContrastText(theme.palette.background.default)
  }
}));

var Player = {
  Events: {
    TIME_UPDATE: "timeupdate",
    CAN_PLAY: "canplaythrough"
  },
  Status: {
    PLAY: "play",
    PAUSE: "pause",
    MUTE: "mute",
    UNMUTE: "unmute",
    LOOP: "loop",
    UNLOOP: "unloop"
  }
};

const playAudio = player => {
  if (player) {
    let playStatus = null;

    if (player.paused) {
      player.play();
      playStatus = Player.Status.PLAY;
    } else {
      player.pause();
      playStatus = Player.Status.PAUSE;
    }

    return {
      playStatus
    };
  }

  return null;
};
const muteAudio = player => {
  if (player) {
    let muteStatus = null;

    if (player.muted) {
      player.muted = false;
      muteStatus = Player.Status.UNMUTE;
    } else {
      player.muted = true;
      muteStatus = Player.Status.MUTE;
    }

    return {
      muteStatus
    };
  }

  return null;
};
const loopAudio = player => {
  if (player) {
    let loopStatus = null;

    if (player.loop) {
      player.loop = false;
      loopStatus = Player.Status.UNLOOP;
    } else {
      player.loop = true;
      loopStatus = Player.Status.LOOP;
    }

    return {
      loopStatus
    };
  }

  return null;
};
const getPlayerStateFromAction = (player, action) => {
  let newState = null;

  switch (action) {
    case Player.Status.LOOP:
      newState = loopAudio(player);
      break;

    case Player.Status.MUTE:
      newState = muteAudio(player);
      break;

    case Player.Status.PLAY:
    default:
      newState = playAudio(player);
      break;
  }

  return newState;
};

const attachToEvent = (player, name, callback) => {
  if (player) {
    player.addEventListener(name, () => callback(player), false);
  }
};
const removeFromEvent = (player, name, callback) => {
  if (player) {
    player.removeEventListener(name, () => callback(player), false);
  }
};

const appendZero = number => number < 10 ? `0${number}` : number;
const getFormattedTime = time => {
  const dateTime = new Date(0, 0, 0, 0, 0, time, 0);
  const dateTimeM = appendZero(dateTime.getMinutes());
  const dateTimeS = appendZero(dateTime.getSeconds());
  return `${dateTimeM}:${dateTimeS}`;
};
const getIconByPlayerStatus = playerStatus => {
  switch (playerStatus) {
    case Player.Status.PAUSE:
      return icons.PlayCircleFilled;

    case Player.Status.PLAY:
    default:
      return icons.PauseCircleFilled;
  }
};
const getProgress = (currentTime, duration) => parseFloat(100 * (currentTime / duration));
const getCurrentTime = (progress, duration) => parseFloat(progress * duration / 100);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class AudioPlayer extends React__default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "player", null);

    _defineProperty(this, "state", {
      current: 0,
      progress: 0,
      duration: 0,
      loopStatus: Player.Status.UNLOOP,
      playStatus: Player.Status.PAUSE,
      muteStatus: Player.Status.UNMUTE
    });

    _defineProperty(this, "triggerAction", action => {
      const newState = getPlayerStateFromAction(this.player, action);

      if (newState) {
        this.setState(newState);
      }
    });

    _defineProperty(this, "handleCanPlay", player => {
      attachToEvent(player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);
      this.setState({
        duration: player.duration
      });
    });

    _defineProperty(this, "handleTimeUpdate", player => {
      this.setState({
        current: player.currentTime,
        progress: getProgress(player.currentTime, player.duration)
      });
    });

    _defineProperty(this, "handleChange", (progress, player) => {
      if (player) {
        const currentTime = getCurrentTime(progress, player.duration);

        if (!isNaN(currentTime)) {
          player.currentTime = currentTime;
        }

        this.setState({
          progress,
          currentTime
        });
      }
    });
  }

  componentDidMount() {
    attachToEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);

    if (this.props.autoPlay) {
      this.triggerAction(Player.Status.PLAY);
    }
  }

  componentWillUnmount() {
    if (this.player) {
      removeFromEvent(this.player, Player.Events.TIME_UPDATE, this.handleTimeUpdate);
      removeFromEvent(this.player, Player.Events.CAN_PLAY, this.handleCanPlay);
      this.player = null;
    }
  }

  render() {
    const _this$props = this.props,
          src = _this$props.src,
          rounded = _this$props.rounded,
          elevation = _this$props.elevation,
          classes = _this$props.classes,
          showLoopIcon = _this$props.showLoopIcon,
          _this$props$className = _this$props.classNames,
          player = _this$props$className.player,
          loopIcon = _this$props$className.loopIcon,
          playIcon = _this$props$className.playIcon,
          muteIcon = _this$props$className.muteIcon,
          slider = _this$props$className.slider,
          track = _this$props$className.track,
          thumb = _this$props$className.thumb,
          text = _this$props$className.text;
    const _this$state = this.state,
          loopStatus = _this$state.loopStatus,
          playStatus = _this$state.playStatus,
          muteStatus = _this$state.muteStatus,
          progress = _this$state.progress,
          current = _this$state.current,
          duration = _this$state.duration;
    const PlayStatusIcon = getIconByPlayerStatus(playStatus);
    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;
    return React__default.createElement(React.Fragment, null, React__default.createElement("audio", {
      ref: node => this.player = node,
      preload: "true",
      controls: true,
      hidden: true
    }, React__default.createElement("source", {
      src: src
    })), React__default.createElement(core.Grid, {
      className: css(classes['player-container'], player),
      elevation: elevation,
      rounded: rounded,
      component: core.Paper,
      alignContent: "center",
      justify: "center",
      alignItems: "center",
      spacing: 8,
      container: true
    }, showLoopIcon && React__default.createElement(core.Grid, {
      md: 1,
      item: true
    }, React__default.createElement(icons.Repeat, {
      className: css(classes['player-icon-disabled'], loopIcon, {
        [classes['player-default-icon']]: isLoopEnable
      }),
      onClick: () => this.triggerAction(Player.Status.LOOP),
      focusable: "true"
    })), React__default.createElement(core.Grid, {
      md: 1,
      item: true
    }, React__default.createElement(PlayStatusIcon, {
      className: css(classes['player-default-icon'], classes['player-main-icon'], playIcon),
      onClick: () => this.triggerAction(Player.Status.PLAY),
      focusable: "true"
    })), React__default.createElement(core.Grid, {
      md: 1,
      item: true
    }, React__default.createElement(icons.VolumeMute, {
      className: css(classes['player-icon-disabled'], muteIcon, {
        [classes['player-default-icon']]: isMuteEnable
      }),
      onClick: () => this.triggerAction(Player.Status.MUTE),
      focusable: "true"
    })), React__default.createElement(core.Grid, {
      md: 2,
      item: true
    }, React__default.createElement(core.Typography, {
      className: css(classes['player-text'], text),
      align: "center",
      noWrap: true
    }, getFormattedTime(current))), React__default.createElement(core.Grid, {
      md: 5,
      item: true
    }, React__default.createElement(lab.Slider, {
      onChange: (_, progress) => this.handleChange(progress, this.player),
      classes: {
        root: css(classes['player-slider-container'], slider),
        track: css(classes['player-slider-track'], track),
        thumb: css(classes['player-slider-thumb'], thumb)
      },
      variant: "determinate",
      color: "secondary",
      value: progress
    })), React__default.createElement(core.Grid, {
      md: 2,
      item: true
    }, React__default.createElement(core.Typography, {
      className: css(classes['player-text'], text),
      align: "center",
      noWrap: true
    }, getFormattedTime(duration)))));
  }

}

_defineProperty(AudioPlayer, "displayName", 'AudioPlayer');

_defineProperty(AudioPlayer, "defaultProps", {
  elevation: 1,
  rounded: false,
  classes: {},
  classNames: {},
  width: '500px',
  height: '50px',
  showLoopIcon: true
});

var AudioPlayer$1 = core.withStyles(styles, {
  withTheme: true
})(AudioPlayer);

exports.AudioPlayer = AudioPlayer$1;
