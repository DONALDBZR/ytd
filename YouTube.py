# Importing YouTube
from pytube import YouTube
# Importing the database handler
from Database import Database
# YTD class
class YTD:
    def __init__(self, link: str, category: str):
        # Instance of YouTube's API
        # TYPE: YouTube
        self.video = YouTube(link)
        # Artist of the video
        # TYPE: String
        self.__artist = self.video.title.split(" - ")[0]
        # Title of the video
        # TYPE: String
        self.__title = self.video.title.split(" - ")[1]
        # The database handler
        # TYPE: Database
        self._Database = Database()
        # Category of the video
        # TYPE: String
        self.__category = category
        # Stream of the media
        # TYPE: Stream
        self._stream = self.video.streams.get_highest_resolution()
        # Verifying the song exists in the database
        self.verifyTitle()
    def verifyTitle(self) -> str | None:
        parameters = (self.__artist, self.__title)
        self._Database.query("SELECT * FROM YouTubeDownloader.Downloads WHERE DownloadsArtist = %s OR DownloadsTitle = %s", parameters)
        if len(self._Database.resultSet()) > 0:
            return "The song already exists"
        else:
            # Verifying the category of the media content
            self.verifyCategory()
    def verifyCategory(self):
        if self.__category == "Music":
            self._stream = self.video.streams.get_audio_only()
        else:
            self._stream = self.video.streams.get_by_itag(22)
        # Downloading the media content
        self.download()
    def download(self) -> str:
        self._stream.download('C:\Apache24\htdocs\ytd.local\Videos')
        return "Media file downloaded!"