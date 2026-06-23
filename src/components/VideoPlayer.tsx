import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { Colors } from '../theme/colors';

interface VideoPlayerProps {
  videoId: string;
  style?: object;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, style }) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const onReady = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={Colors.gold} size="large" />
        </View>
      )}
      <YoutubeIframe
        height={220} // fixed height for 16:9 ratio approximately
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
        onReady={onReady}
        webViewProps={{
          allowsInlineMediaPlayback: true,
          allowsFullscreenVideo: true,
          androidLayerType: 'hardware',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
    height: 220,
    position: 'relative',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
});
