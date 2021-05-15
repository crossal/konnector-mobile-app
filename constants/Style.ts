import { StyleSheet } from 'react-native';

const primaryColour = "#2ECC71";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  containerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20
  },
  scrollView: {
    flex: 1,
    width: "100%"
  },
  scrollViewContent: {

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
    alignSelf: 'stretch',
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: 'gray',
    textAlign: 'left'
  },
  centredInput: {
    width: 250,
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: 'gray',
    textAlign: 'left'
  },
  button: {
    alignItems: "center",
    backgroundColor: primaryColour,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonLeft: {
    alignSelf: 'flex-start',
    alignItems: "center",
    backgroundColor: primaryColour,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonLabel: {
    textAlign: 'left'
  },
  buttonText: {
    color: 'white'
  },
  formErrorText: {
    textAlign: 'left',
    color: 'red',
    marginBottom: 10
  },
  centredFormErrorText: {
    width: 250,
    textAlign: 'left',
    color: 'red',
    marginBottom: 10
  }
});

export { styles };
