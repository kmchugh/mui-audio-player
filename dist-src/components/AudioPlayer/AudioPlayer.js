function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Grid, Paper, Typography, withStyles } from '@material-ui/core';
import { Repeat as LoopStatusIcon, VolumeMute as MuteStatusIcon } from '@material-ui/icons';
import { Slider } from '@material-ui/lab';
import css from 'classnames';
import React, { Fragment } from 'react';
import styles from "./styles.js";
import { attachToEvent, getCurrentTime, getFormattedTime, getIconByPlayerStatus, getPlayerStateFromAction, getProgress, removeFromEvent } from "./utils/index.js";
import Player from "./utils/constants.js";

class AudioPlayer extends React.Component {
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
    const {
      src,
      rounded,
      elevation,
      classes,
      showLoopIcon,
      classNames: {
        player,
        loopIcon,
        playIcon,
        muteIcon,
        slider,
        track,
        thumb,
        text
      }
    } = this.props;
    const {
      loopStatus,
      playStatus,
      muteStatus,
      progress,
      current,
      duration
    } = this.state;
    const PlayStatusIcon = getIconByPlayerStatus(playStatus);
    const isLoopEnable = loopStatus === Player.Status.LOOP;
    const isMuteEnable = muteStatus === Player.Status.MUTE;
    return React.createElement(Fragment, null, React.createElement("audio", {
      ref: node => this.player = node,
      preload: "true",
      controls: true,
      hidden: true
    }, React.createElement("source", {
      src: src
    })), React.createElement(Grid, {
      className: css(classes['player-container'], player),
      elevation: elevation,
      rounded: rounded,
      component: Paper,
      alignContent: "center",
      justify: "center",
      alignItems: "center",
      spacing: 8,
      container: true
    }, showLoopIcon && React.createElement(Grid, {
      md: 1,
      item: true
    }, React.createElement(LoopStatusIcon, {
      className: css(classes['player-icon-disabled'], loopIcon, {
        [classes['player-default-icon']]: isLoopEnable
      }),
      onClick: () => this.triggerAction(Player.Status.LOOP),
      focusable: "true"
    })), React.createElement(Grid, {
      md: 1,
      item: true
    }, React.createElement(PlayStatusIcon, {
      className: css(classes['player-default-icon'], classes['player-main-icon'], playIcon),
      onClick: () => this.triggerAction(Player.Status.PLAY),
      focusable: "true"
    })), React.createElement(Grid, {
      md: 1,
      item: true
    }, React.createElement(MuteStatusIcon, {
      className: css(classes['player-icon-disabled'], muteIcon, {
        [classes['player-default-icon']]: isMuteEnable
      }),
      onClick: () => this.triggerAction(Player.Status.MUTE),
      focusable: "true"
    })), React.createElement(Grid, {
      md: 2,
      item: true
    }, React.createElement(Typography, {
      className: css(classes['player-text'], text),
      align: "center",
      noWrap: true
    }, getFormattedTime(current))), React.createElement(Grid, {
      md: 5,
      item: true
    }, React.createElement(Slider, {
      onChange: (_, progress) => this.handleChange(progress, this.player),
      classes: {
        root: css(classes['player-slider-container'], slider),
        track: css(classes['player-slider-track'], track),
        thumb: css(classes['player-slider-thumb'], thumb)
      },
      variant: "determinate",
      color: "secondary",
      value: progress
    })), React.createElement(Grid, {
      md: 2,
      item: true
    }, React.createElement(Typography, {
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

export default withStyles(styles, {
  withTheme: true
})(AudioPlayer);