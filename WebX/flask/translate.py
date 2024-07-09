from googletrans import Translator

def get_language_code(language_name):
    # Dictionary of language names and their corresponding language codes
    languages = {
        'english': 'en',
        'french': 'fr',
        'spanish': 'es',
        'german': 'de',
        'italian': 'it',
        'portuguese': 'pt',
        'russian': 'ru',
        'chinese': 'zh-CN',
        'japanese': 'ja',
        'arabic': 'ar'
    }
    # Convert language name to lowercase for case-insensitive comparison
    language_name_lower = language_name.lower()
    # Return the language code corresponding to the given language name
    return languages.get(language_name_lower)

def translate_text(text, target_language):
    translator = Translator()
    translated_text = translator.translate(text, dest=target_language)
    return translated_text.text

if __name__ == "__main__":
    print("Welcome to the language translator!")
    print("Here are some common language options:")
    print("1. English\n2. French\n3. Spanish\n4. German\n5. Italian\n6. Portuguese\n7. Russian\n8. Chinese\n9. Japanese\n10. Arabic")

    target_language_name = input("Enter the name of the target language you want to translate to: ")
    target_language_code = get_language_code(target_language_name)

    if target_language_code:
        text = input("Enter the text to translate: ")

        translated_text = translate_text(text, target_language_code)
        print("Translated text:", translated_text)
    else:
        print("Invalid target language name. Please choose from the provided options.")
