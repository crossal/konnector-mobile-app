import { StyleSheet } from 'react-native';

const primaryColour = "#2ECC71";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20
  },
  containerInnerLeft: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: 'gray',
    textAlign: 'left'
  },
  button: {
    alignItems: "center",
    backgroundColor: primaryColour,
    padding: 10,
    borderRadius: 5
  },
  buttonLabel: {
    textAlign: 'left'
  },
  buttonText: {
    color: 'white'
  }
});

export { styles };