import { StyleSheet, View } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../constants/colors';

const Card = ({
  title,
  subtitle,
  icon,
  children,
  onPress,
  rightContent,
  style,
  contentStyle
}) => {
  return (
    <PaperCard
      mode="elevated"
      onPress={onPress}
      style={[styles.card, style]}
      contentStyle={contentStyle}
    >
      <PaperCard.Content>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            {icon ? (
              <View style={styles.iconWrap}>
                <Ionicons name={icon} size={18} color={COLORS.primary} />
              </View>
            ) : null}
            <View style={styles.textGroup}>
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
          </View>
          {rightContent ? <View>{rightContent}</View> : null}
        </View>
        {children ? <View style={styles.body}>{children}</View> : null}
      </PaperCard.Content>
    </PaperCard>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: COLORS.surface
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  titleGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    height: 36,
    justifyContent: 'center',
    width: 36
  },
  textGroup: {
    flex: 1
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700'
  },
  subtitle: {
    color: COLORS.textLight,
    fontSize: 13,
    marginTop: 2
  },
  body: {
    marginTop: 14
  }
});

export default Card;
