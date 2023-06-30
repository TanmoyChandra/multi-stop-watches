import React, { useEffect, useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

import { themes } from "../../../themes/themes";
const theme = themes.default;

const Settings = () => {
  const { colors } = useTheme();
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    // Perform any necessary initialization or data fetching here
  }, []);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
    // Update the dark mode setting in your app's state or storage
    // You can also apply the new theme here if you're using custom theming
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.primaryBackgroundColor },
      ]}
    >
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.textColor_light }]}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
          trackColor={{ false: colors.disabled, true: theme.buttonLight }}
          thumbColor={isDarkModeEnabled ? theme.accentColor : colors.surface}
        />
      </View>
      <View style={[styles.line, { borderColor: "grey" }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
  },
  line: {
    borderBottomWidth: 1,
  },
});

export default Settings;
