import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';

const stack = [
  'React Native', 'React', 'Python', 'FastAPI',
  'n8n', 'Supabase', 'TypeScript', 'AI Agents',
];

const links = [
  {
    icon: 'logo-github' as const,
    label: 'GitHub',
    value: 'github.com/Davidcx8',
    url: 'https://github.com/Davidcx8',
  },
  {
    icon: 'logo-linkedin' as const,
    label: 'LinkedIn',
    value: 'jose-dcastillo',
    url: 'https://www.linkedin.com/in/jose-dcastillo/',
  },
  {
    icon: 'mail-outline' as const,
    label: 'Email',
    value: 'josedavidcastillocastillo75@gmail.com',
    url: 'mailto:josedavidcastillocastillo75@gmail.com',
  },
  {
    icon: 'logo-whatsapp' as const,
    label: 'WhatsApp',
    value: '+1 (809) 849-2337',
    url: 'https://wa.me/18098492337',
  },
];

export const ContactScreen: React.FC = () => {
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>CONTRÁTAME</Text>
          <View style={styles.divider}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>
          <Text style={styles.subtitle}>Pergamino de Servicio</Text>
        </View>

        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/mi_foto.webp')}
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.avatarRing} />
          </View>
          <Text style={styles.name}>Jose David Castillo</Text>
          <Text style={styles.role}>Full Stack Developer & AI/Automation Engineer</Text>

          {/* Stack pills */}
          <View style={styles.stackRow}>
            {stack.map(s => (
              <View key={s} style={styles.pill}>
                <Text style={styles.pillText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Parchment text */}
        <View style={styles.parchment}>
          <Text style={styles.parchmentHead}>¿Te impresionó esta app?</Text>
          <View style={styles.dividerSmall}>
            <View style={styles.divLine} />
            <Text style={styles.divDiamond}>◆</Text>
            <View style={styles.divLine} />
          </View>
          <Text style={styles.parchmentBody}>
            Esto es solo una muestra de lo que puedo construir. Si tienes una idea, un MVP que lanzar, o un sistema que automatizar, hablemos — convierto proyectos ambiciosos en productos reales, funcionando y listos para producción.
          </Text>
        </View>

        {/* Links */}
        <View style={styles.linksCard}>
          {links.map(link => (
            <TouchableOpacity
              key={link.label}
              style={styles.linkRow}
              onPress={() => openLink(link.url)}
              activeOpacity={0.7}
            >
              <Ionicons name={link.icon} size={20} color={Colors.gold} style={styles.linkIcon} />
              <View style={styles.linkText}>
                <Text style={styles.linkLabel}>{link.label}</Text>
                <Text style={styles.linkValue} numberOfLines={1}>{link.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA Primary */}
        <TouchableOpacity
          style={styles.ctaPrimary}
          onPress={() => openLink('https://wa.me/18098492337')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaPrimaryText}>AGENDA UNA LLAMADA</Text>
        </TouchableOpacity>

        {/* CTA Secondary */}
        <TouchableOpacity
          style={styles.ctaSecondary}
          onPress={() => openLink('mailto:josedavidcastillocastillo75@gmail.com')}
        >
          <Text style={styles.ctaSecondaryText}>O envíame un correo</Text>
        </TouchableOpacity>

        {/* Microcopy */}
        <Text style={styles.microcopy}>
          Respuesta en menos de 24 horas. Sin compromiso.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  pageTitle: { ...Typography.pageTitle, color: Colors.textGold },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    marginVertical: 12,
  },
  divLine: { flex: 1, height: 1, backgroundColor: Colors.borderDim },
  divDiamond: { color: Colors.gold, fontSize: 12, marginHorizontal: 8 },
  subtitle: { ...Typography.italicSmall, color: Colors.textSecondary, marginBottom: 8 },
  profileCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    padding: 24,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  name: {
    ...Typography.sectionTitle,
    color: Colors.textGold,
    marginBottom: 4,
    textAlign: 'center',
  },
  role: {
    ...Typography.italic,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 20,
  },
  stackRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  pill: {
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.background,
  },
  pillText: { ...Typography.label, color: Colors.textSecondary, letterSpacing: 0.5 },
  parchment: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderDim,
  },
  parchmentHead: {
    ...Typography.sectionTitle,
    color: Colors.textGold,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 20,
  },
  dividerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
  parchmentBody: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'justify',
    lineHeight: 26,
  },
  linksCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: Colors.backgroundMid,
    borderWidth: 1,
    borderColor: Colors.borderDim,
    borderRadius: 2,
    overflow: 'hidden',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderSubtle,
  },
  linkIcon: { marginRight: 14 },
  linkText: { flex: 1 },
  linkLabel: { ...Typography.label, color: Colors.textSecondary, letterSpacing: 1, marginBottom: 2 },
  linkValue: { ...Typography.bodySmall, color: Colors.textPrimary },
  ctaPrimary: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: Colors.gold,
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 2,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaPrimaryText: {
    ...Typography.navLabel,
    color: Colors.background,
    fontSize: 14,
    letterSpacing: 3,
  },
  ctaSecondary: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  ctaSecondaryText: {
    ...Typography.body,
    color: Colors.textSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
    paddingBottom: 2,
  },
  microcopy: {
    ...Typography.italicSmall,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
});
