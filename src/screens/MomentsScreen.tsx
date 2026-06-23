import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moments } from '../data/moments';
import { MomentCard } from '../components/MomentCard';
import { Moment, MomentsStackParamList, DrawerParamList } from '../navigation/types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

type MomentsNavProp = StackNavigationProp<MomentsStackParamList, 'MomentsList'>;
type DrawerNavProp = DrawerNavigationProp<DrawerParamList>;

export const MomentsScreen: React.FC = () => {
  const navigation = useNavigation<MomentsNavProp>();
  const drawerNav = useNavigation<DrawerNavProp>();
  const insets = useSafeAreaInsets();

  const handlePress = (moment: Moment) => {
    navigation.navigate('MomentDetail', { moment });
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={moments}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Custom header with hamburger */}
            <View style={[styles.topBar, { paddingTop: insets.top + 12 }]}>
              <TouchableOpacity onPress={() => drawerNav.openDrawer()} style={styles.menuBtn}>
                <Ionicons name="menu" size={24} color={Colors.gold} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>MOMENTOS</Text>
              <View style={styles.menuBtn} />
            </View>
            {/* Section header */}
            <View style={styles.header}>
              <View style={styles.divider}>
                <View style={styles.divLine} />
                <Text style={styles.divDiamond}>◆</Text>
                <View style={styles.divLine} />
              </View>
              <Text style={styles.subtitle}>Los instantes que cambiaron Westeros</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <MomentCard moment={item} onPress={handlePress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.backgroundMid,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDim,
  },
  menuBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...Typography.navLabel,
    color: Colors.gold,
    letterSpacing: 3,
  },
  list: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginBottom: 12,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  subtitle: {
    ...Typography.italicSmall,
    color: Colors.textSecondary,
  },
});
