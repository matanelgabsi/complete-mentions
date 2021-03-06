import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

import { MentionInput, Tag } from 'react-native-complete-mentions';

const suggestedUsers = [{ name: 'John', id: 1 }, { name: 'Eve', id: 2 }];
const suggestedClubs = [{ name: 'Foo', id: 1 }, { name: 'Bar', id: 2 }];

function UserSuggestion({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.userSuggestionContainer}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

function ClubSuggestion({ name, id, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.clubSuggestionContainer}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

/*
  This solution shows how to render multiple tags
*/

export default function Multiple() {
  const [value, setValue] = React.useState('');
  const [extractedValue, setExtractedValue] = React.useState('');

  React.useEffect(() => {
    console.log(extractedValue);
  }, [extractedValue]);

  const renderUserSuggestions = ({ keyword, tracking, commit }) => {
    if (!tracking || keyword === '') return null;
    return suggestedUsers.map(user => (
      <UserSuggestion
        name={user.name}
        id={user.id}
        onPress={() => commit({ name: user.name, id: user.id })}
      />
    ));
  };

  const renderClubSuggestions = ({ keyword, tracking, commit }) => {
    if (!tracking || keyword === '') return null;
    return suggestedClubs.map(user => (
      <ClubSuggestion
        name={user.name}
        id={user.id}
        onPress={() => commit({ name: user.name, id: user.id })}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <MentionInput
        value={value}
        onChangeText={setValue}
        onExtractedStringChange={setExtractedValue}
        style={styles.input}>
        <Tag
          tag="@"
          renderSuggestions={renderUserSuggestions}
          renderText={mention => <Text style={styles.userText}>{mention.name}</Text>}
          formatText={text => `@${text}`}
          extractString={mention => `@[${mention.name}](id:${mention.id})`}
        />
        <Tag
          tag="#"
          renderSuggestions={renderClubSuggestions}
          renderText={mention => <Text style={styles.clubText}>{mention.name}</Text>}
          formatText={text => `#${text}`}
          extractString={mention => `#[${mention.name}](id:${mention.id})`}
        />
      </MentionInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  userSuggestionContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'blue',
    marginBottom: 2,
  },
  clubSuggestionContainer: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 2,
  },
  userText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  clubText: {
    fontWeight: 'green',
    color: 'red',
  },
});
