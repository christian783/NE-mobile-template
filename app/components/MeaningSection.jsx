import { StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, SPACING } from '../constants';
import PartOfSpeechBadge from './PartOfSpeechBadge';

const MeaningSection = ({ meaning }) => {
  const definitions = Array.isArray(meaning?.definitions)
    ? meaning.definitions
    : [];

  if (!meaning || definitions.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <PartOfSpeechBadge label={meaning.partOfSpeech || 'Meaning'} />
        <View style={styles.line} />
      </View>
      <View style={styles.definitions}>
        {definitions.map((item, index) => (
          <View key={`${item.definition}-${index}`} style={styles.definitionRow}>
            <Text style={styles.number}>{index + 1}.</Text>
            <View style={styles.definitionContent}>
              <Text style={styles.definition}>{item.definition}</Text>
              {item.example ? (
                <View style={styles.example}>
                  <Text style={styles.exampleText}>{`"${item.example}"`}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.xl
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md
  },
  line: {
    backgroundColor: COLORS.border,
    flex: 1,
    height: StyleSheet.hairlineWidth
  },
  definitions: {
    gap: SPACING.md
  },
  definitionRow: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: SPACING.sm,
    padding: SPACING.md
  },
  number: {
    color: COLORS.accentContainer,
    fontFamily: FONTS.bodyBold,
    fontSize: 20,
    lineHeight: 28
  },
  definitionContent: {
    flex: 1,
    gap: SPACING.sm
  },
  definition: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    fontSize: 17,
    lineHeight: 26
  },
  example: {
    borderLeftColor: COLORS.border,
    borderLeftWidth: 2,
    paddingLeft: SPACING.md,
    paddingVertical: SPACING.xs
  },
  exampleText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20
  }
});

export default MeaningSection;
