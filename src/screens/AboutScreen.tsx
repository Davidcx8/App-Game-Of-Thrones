import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { aboutData } from '../data/about';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

const { width } = Dimensions.get('window');

export const AboutScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/bg-texture.webp')}
          style={styles.textureBg}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.pageTitle}>ACERCA DE</Text>
            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divDiamond}>◆</Text>
              <View style={styles.divLine} />
            </View>
            <Text style={styles.showName}>{aboutData.show}</Text>
            <Text style={styles.years}>{aboutData.years}</Text>
          </View>

          {/* Main content card */}
          <View style={styles.parchmentCard}>
            <Text style={styles.network}>{aboutData.network}</Text>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divDiamond}>◆</Text>
              <View style={styles.divLine} />
            </View>

            <Text style={styles.description}>{aboutData.description}</Text>

            <View style={styles.divider}>
              <View style={styles.divLine} />
              <Text style={styles.divDiamond}>◆</Text>
              <View style={styles.divLine} />
            </View>

            {/* Creators */}
            <Text style={styles.metaLabel}>CREADORES</Text>
            <Text style={styles.metaValue}>{aboutData.creators.join(' & ')}</Text>

            <Text style={styles.metaLabel}>BASADA EN</Text>
            <Text style={styles.metaValue}>{aboutData.basedOn}</Text>

            {/* Stats grid */}
            <View style={styles.statsGrid}>
              {aboutData.stats.map(stat => (
                <View key={stat.label} style={styles.statItem}>
                  <Text style={styles.statVal}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Quote */}
          <View style={styles.quoteCard}>
            <Text style={styles.quoteMark}>"</Text>
            <Text style={styles.quoteText}>{aboutData.quote.replace(/"/g, '')}</Text>
            <Text style={styles.quoteAuthor}>{aboutData.quoteAuthor}</Text>
          </View>

          {/* Emmy badges */}
          <View style={styles.emmyRow}>
            <View style={styles.emmyBadge}>
              <Text style={styles.emmyNum}>{aboutData.emmyNominations}</Text>
              <Text style={styles.emmyLabel}>Nominaciones{'\n'}Emmy</Text>
            </View>
            <View style={styles.emmySep} />
            <View style={styles.emmyBadge}>
              <Text style={styles.emmyNum}>{aboutData.emmyWins}</Text>
              <Text style={styles.emmyLabel}>Emmys{'\n'}Ganados</Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  textureBg: {
    minHeight: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26,10,0,0.88)',
  },
  header: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  pageTitle: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 4,
    marginBottom: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginVertical: 10,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  showName: {
    ...Typography.heroTitle,
    color: Colors.gold,
    textAlign: 'center',
    fontSize: 30,
    letterSpacing: 5,
  },
  years: {
    ...Typography.italic,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  parchmentCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    padding: 20,
  },
  network: {
    ...Typography.navLabel,
    color: Colors.gold,
    textAlign: 'center',
    letterSpacing: 4,
    marginBottom: 16,
  },
  description: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'justify',
    lineHeight: 26,
    marginBottom: 16,
  },
  metaLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 3,
    marginTop: 14,
    marginBottom: 4,
  },
  metaValue: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    gap: 8,
  },
  statItem: {
    width: (width - 72) / 2,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    alignItems: 'center',
    paddingVertical: 14,
  },
  statVal: {
    ...Typography.pageTitle,
    color: Colors.gold,
    fontSize: 26,
  },
  statLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginTop: 4,
  },
  quoteCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderDim,
  },
  quoteMark: {
    color: Colors.gold,
    fontSize: 48,
    lineHeight: 40,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  quoteText: {
    ...Typography.italic,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
  },
  emmyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    paddingHorizontal: 40,
  },
  emmyBadge: {
    alignItems: 'center',
    flex: 1,
  },
  emmyNum: {
    ...Typography.heroTitle,
    color: Colors.gold,
    fontSize: 42,
  },
  emmyLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  emmySep: {
    width: 1,
    height: 60,
    backgroundColor: Colors.borderDim,
    marginHorizontal: 20,
  },
});
