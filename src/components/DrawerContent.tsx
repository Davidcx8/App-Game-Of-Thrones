import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { useAppStore } from '../store/useAppStore';

type DrawerRoute = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const routes: DrawerRoute[] = [
  { name: 'Home', label: 'INICIO', icon: 'home-outline' },
  { name: 'Characters', label: 'PERSONAJES', icon: 'people-outline' },
  { name: 'Moments', label: 'MOMENTOS', icon: 'film-outline' },
  { name: 'About', label: 'ACERCA DE', icon: 'book-outline' },
  { name: 'Game', label: 'JUEGA CONMIGO', icon: 'game-controlloer-outline' },
  { name: 'Contact', label: 'CONTRÁTAME', icon: 'briefcase-outline' },
];

export const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { state, navigation } = props;
  const activeIndex = state.index;
  const getTitle = useAppStore(s => s.getTitle);

  const title = getTitle();

  return (
    <View style={styles.root}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/mi_foto.webp')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.avatarBorder} />
          </View>
          <Text style={styles.wordmark}>GAME OF THRONES</Text>
          <Text style={styles.roleText}>LORD COMMANDANT</Text>
        </View>

        {/* Separator with diamond */}
        <View style={styles.separator}>
          <View style={styles.sepLine} />
          <Text style={styles.sepDiamond}>◆</Text>
          <View style={styles.sepLine} />
        </View>

        {/* Nav items */}
        <View style={styles.navItems}>
          {routes.map((route, index) => {
            const isActive = activeIndex === index;
            return (
              <TouchableOpacity
                key={route.name}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => navigation.navigate(route.name)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={route.icon}
                  size={20}
                  color={isActive ? Colors.gold : Colors.textSecondary}
                  style={styles.navIcon}
                />
                <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                  {route.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerRankLabel}>RANGO ACTUAL</Text>
          <Text style={styles.footerRank}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.drawerBg,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  header: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  avatarBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  wordmark: {
    ...Typography.cardTitle,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 4,
  },
  roleText: {
    ...Typography.label,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 4,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderDim,
  },
  sepDiamond: {
    color: Colors.gold,
    fontSize: 10,
    marginHorizontal: 10,
  },
  navItems: {
    paddingHorizontal: 0,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderSubtle,
    position: 'relative',
  },
  navItemActive: {
    backgroundColor: 'rgba(197,160,40,0.08)',
  },
  activeIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.gold,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  navIcon: {
    marginRight: 16,
  },
  navLabel: {
    ...Typography.navLabel,
    color: Colors.textSecondary,
    flex: 1,
  },
  navLabelActive: {
    color: Colors.gold,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDim,
    backgroundColor: Colors.drawerBg,
  },
  footerLeft: {
    flex: 1,
  },
  footerRankLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    letterSpacing: 2,
    fontSize: 9,
    marginBottom: 2,
  },
  footerRank: {
    ...Typography.italicSmall,
    color: Colors.gold,
    fontSize: 11,
  },
  settingsBtn: {
    padding: 6,
  },
});
