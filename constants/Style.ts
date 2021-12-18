import { StyleSheet } from 'react-native';

const colours = {
  primary: "#2ECC71",
  remove: "#E0E0E0"
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
  noPadding: {
    padding: 0
  },
  scrollView: {
    flex: 1,
    width: "100%",
    padding: 20
  },
  scrollViewContent: {

  },
  containerInnerLeft: {

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  pagination: {
    flexDirection: 'row'
  },
  listSeparator: {
    height: 1,
    backgroundColor: 'gray'
  },
  listItemTop: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderTopWidth: 1
  },
  listItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 15,
    alignItems: 'center',
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  empty: {},
  listItemBottom: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
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
  listButton: {
    alignItems: "center",
    backgroundColor: colours.remove,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  listText: {
    flex: 1
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
  white: {
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
  },
  smallSpace: {
    margin: 10
  },
  smallSpaceRight: {
    marginRight: 10
  }
});

export { styles, colours };
