# Importing YouTube
from pytube import YouTube
from pytube.cli import on_progress
# Importing the database handler
from Database import Database
# Importing Music
from Music import Music
# YTD class
class YTD:
    def __init__(self):
        # The url of the video
        # TYPE: String
        self.__link = ""
        # Category of the video
        # TYPE: String
        self.__category = ""
        # The database handler
        # TYPE: Database
        self._Database = Database()
        # Artist of the video
        # TYPE: String
        self.__artist = ""
        # Title of the video
        # TYPE: String
        self.__title = ""
        # Chunk size needed
        self.__chunkSize = 1024
        # Updating the data in the database
        # TYPE: Music
        self._Music = Music()

    def getLink(self):
        return self.__link
    def setLink(self, link: str):
        self.__link = link

    def getCategory(self):
        return self.__category
    def setCategory(self, category: str):
        self.__category = category

    def getArtist(self):
        return self.__artist
    def setArtist(self, artist: str):
        self.__artist = artist

    def getTitle(self):
        return self.__title
    def setTitle(self, title: str):
        self.__title = title


    def verifyTitle(self) -> str | None:
        self.video = YouTube(self.getLink(), on_progress_callback=on_progress)
        self.setArtist(self.video.title.split(" - ")[0])
        self.setTitle(self.video.title.split(" - ")[1])
        parameters = (self.getArtist(), self.getTitle())
        self._Database.query("SELECT * FROM YouTubeDownloader.Downloads WHERE DownloadsArtist = %s AND DownloadsTitle = %s", parameters)
        if len(self._Database.resultSet()) > 0:
            print("The song already exists")
        else:
            # Verifying the category of the media content
            self.verifyCategory()

    def verifyCategory(self):
        if self.getCategory() == "Music":
            self._stream = self.video.streams.get_audio_only()
        else:
            self._stream = self.video.streams.get_by_itag(22)
        # Downloading the media content
        self.download()

    def download(self) -> str:
        self._stream.download('C:\Apache24\htdocs\ytd.local\Videos')
        print("Media file downloaded!")