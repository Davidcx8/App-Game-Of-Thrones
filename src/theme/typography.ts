import { StyleSheet } from 'react-native';

export const Typography = StyleSheet.create({
  // Cinzel (Display, Titles, Headings)
  heroTitle: {
    fontFamily: 'Cinzel_900Black',
    fontSize: 36,
  },
  pageTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 24,
    letterSpacing: 2,
  },
  sectionTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 18,
    letterSpacing: 1.5,
  },
  cardTitle: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  navLabel: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  romanNumeral: {
    fontFamily: 'Cinzel_700Bold',
    fontSize: 14,
  },

  // Lora (Body, Quotes, Descriptions)
  loraBold: {
    fontFamily: 'Lora_700Bold',
  },
  quizQuestion: {
    fontFamily: 'Lora_700Bold',
    fontSize: 22,
    lineHeight: 32,
  },
  bodyLarge: {
    fontFamily: 'Lora_400Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  body: {
    fontFamily: 'Lora_400Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  bodySmall: {
    fontFamily: 'Lora_400Regular',
    fontSize: 13,
    lineHeight: 20,
  },
  italic: {
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 15,
    lineHeight: 24,
  },
  italicSmall: {
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 13,
    lineHeight: 20,
  },
});
