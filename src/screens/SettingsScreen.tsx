import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useAppStore } from '../store/useAppStore';

export const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const soundEnabled = useAppStore(s => s.soundEnabled);
  const sfxEnabled = useAppStore(s => s.sfxEnabled);
  const toggleSound = useAppStore(s => s.toggleSound);
  const toggleSfx = useAppStore(s => s.toggleSfx);

  return (
    <View style={[styles.root, { paddingTop: insets.top > 0 ? insets.top : 16 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>AJUSTES</Text>
          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>
          <Text style={styles.subtitle}>Personaliza tu experiencia en Westeros</Text>
        </View>

        {/* Audio Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="musical-notes-outline" size={16} color={Colors.gold} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>AUDIO</Text>
          </View>

          {/* Music toggle */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="musical-note-outline" size={20} color={Colors.textSecondary} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowLabel}>MÚSICA DE FONDO</Text>
                <Text style={styles.rowDesc}>Música ambiental temática en cada sección</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: Colors.borderDim, true: Colors.goldDim }}
              thumbColor={soundEnabled ? Colors.gold : Colors.textMuted}
              ios_backgroundColor={Colors.borderDim}
            />
          </View>

          <View style={styles.separator} />

          {/* SFX toggle */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="volume-high-outline" size={20} color={Colors.textSecondary} style={styles.rowIcon} />
              <View>
                <Text style={styles.rowLabel}>EFECTOS DE SONIDO</Text>
                <Text style={styles.rowDesc}>Sonidos hápticos y de feedback del Quiz</Text>
              </View>
            </View>
            <Switch
              value={sfxEnabled}
              onValueChange={toggleSfx}
              trackColor={{ false: Colors.borderDim, true: Colors.goldDim }}
              thumbColor={sfxEnabled ? Colors.gold : Colors.textMuted}
              ios_backgroundColor={Colors.borderDim}
            />
          </View>
        </View>

        {/* About section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.gold} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>INFORMACIÓN</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>VERSIÓN</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>SDK</Text>
            <Text style={styles.infoValue}>Expo SDK 51</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PLATAFORMA</Text>
            <Text style={styles.infoValue}>Android</Text>
          </View>
        </View>

        {/* Footer note */}
        <Text style={styles.footerNote}>
          "Power resides where men believe it resides."
        </Text>
        <Text style={styles.footerAuthor}>— Lord Varys</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  pageTitle: {
    ...Typography.pageTitle,
    color: Colors.textGold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginVertical: 12,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  subtitle: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDim,
    backgroundColor: Colors.backgroundLight,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.gold,
    letterSpacing: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    ...Typography.label,
    color: Colors.textPrimary,
    letterSpacing: 1.5,
    marginBottom: 3,
  },
  rowDesc: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    fontSize: 11,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.borderSubtle,
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  infoLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  infoValue: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  footerNote: {
    ...Typography.italic,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 10,
    fontSize: 13,
  },
  footerAuthor: {
    ...Typography.label,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 40,
    letterSpacing: 2,
  },
});
