import { StyleSheet } from 'react-native';

const colours = {
  primary: "#2ECC71"
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
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
  inputWithError: {
    alignSelf: 'stretch',
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    borderColor: 'red',
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
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  buttonLeft: {
    alignSelf: 'flex-start',
    alignItems: "center",
    backgroundColor: colours.primary,
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

export { styles, colours };
