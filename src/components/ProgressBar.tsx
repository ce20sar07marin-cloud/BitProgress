import { StyleSheet, View } from "react-native";

import { useColors } from "@/hooks/useColors";
import { radius } from "@/constants/theme";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const colors = useColors();
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, { backgroundColor: colors.primarySoft }]}>
      <View
        style={[
          styles.progress,
          { width: `${clampedProgress}%` as unknown as number, backgroundColor: colors.primary },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderRadius: radius.full,
    overflow: "hidden",
    flexShrink: 0,
  },
  progress: {
    height: "100%",
    borderRadius: radius.full,
  },
});

export default ProgressBar;
