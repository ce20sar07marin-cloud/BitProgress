import { useState } from "react";

import { StyleSheet, TextInput } from "react-native";

import { useColors } from "@/hooks/useColors";
import { font, radius, spacing } from "@/constants/theme";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const colors = useColors();

  return (
    <TextInput
      style={[styles.input, { borderColor: focused ? colors.borderFocus : colors.borderInput, backgroundColor: colors.surface, color: colors.textMain }]}
      placeholder="Buscar término..."
      placeholderTextColor={colors.placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    fontSize: font.size.base,
    marginVertical: spacing.md,
  },
});

export default SearchBar;
