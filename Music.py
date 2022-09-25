# Importing OS
import os
# Importing Math
import math
# Importing the Database Handler
from Database import Database
# Music class
class Music:
    # Constructor method
    def __init__(self):
        # The Directory of the files
        # TYPE: String
        self.__directory = "E:/.MP3 files"
        # The files inside of the directory
        # TYPE: String[]
        self.__files = os.listdir(self.__directory)
        # The files that are audio files
        # TYPE: String[]
        self.__musicFiles = []
        # The Database Handler
        # TYPE: Database
        self._Database = Database()
        # Organizing the files inside of the directory
        self.organiseFiles()

    def organiseFiles(self):
        for index in range(0, len(self.__files), 1):
            if self.__files[index].endswith(".mp3"):
                self.__musicFiles.append(self.__files[index].replace(".mp3", ""))
        # Removing files without proper titles
        self.removeFilesWithoutTitles()

    def removeFilesWithoutTitles(self):
        filesWithOnlyTitles = []
        for index in range(0, len(self.__musicFiles), 1):
            if not self.__musicFiles[index].startswith("(") and not self.__musicFiles[index].startswith(" ("):
                filesWithOnlyTitles.append(self.__musicFiles[index])
        self.__musicFiles = filesWithOnlyTitles
        # Keeping only the files that have {Artist} - {Title}
        self.reworkFiles()

    def reworkFiles(self):
        filesWithProperTitles = []
        for index in range(0, len(self.__musicFiles), 1):
            if "-" in self.__musicFiles[index]:
                if not self.__musicFiles[index].startswith("AFRO -") and not self.__musicFiles[index].startswith("EDM -") and not self.__musicFiles[index].startswith("RNB -") and not self.__musicFiles[index].startswith("SEGA -") and not self.__musicFiles[index].startswith("ZOUK -"):
                    filesWithProperTitles.append(self.__musicFiles[index])
        self.__musicFiles = filesWithProperTitles
        # Getting the size of the file
        self.getSize()

    def getSize(self):
        fileWithSize = []
        file = ""
        for firstIndex in range(0, len(self.__musicFiles), 1):
            filePath = self.__directory + "/" + self.__musicFiles[firstIndex] + ".mp3"
            size = os.path.getsize(filePath)
            # Calculating the size correctly
            fileSize = self.calculateSize(size)
            file = self.__musicFiles[firstIndex] + " - " + fileSize
            fileWithSize.append(file)
        self.__musicFiles = fileWithSize
        # Adding the category of the content
        self.categorize()

    def categorize(self):
        newList = []
        file = ""
        for index in range(0, len(self.__musicFiles), 1):
            file = self.__musicFiles[index] + " - Music"
            newList.append(file)
        self.__musicFiles = newList
        # Building the record
        self.buildRecord()

    def calculateSize(self, size):
        sizeName = ["B", "KB", "MB", "GB"]
        index = math.floor(math.log(size, 1024))
        limit = math.pow(1024, index)
        fileSize = round(size / limit, 3)
        return str(fileSize) + " " + sizeName[index]

    def buildRecord(self):
        record = []
        for index in range(0, len(self.__musicFiles), 1):
            record.append(self.__musicFiles[index].split(" - "))
        self.__musicFiles = record
        # Updating the data
        self.update()

    def update(self):
        self._Database.query("SELECT * FROM YouTubeDownloader.Downloads", None)
        downloads = self._Database.resultSet()
        if len(downloads) == 0:
            for firstIndex in range(0, len(self.__musicFiles), 1):
                    DownloadsArtist = self.__musicFiles[firstIndex][0]
                    DownloadsTitle = self.__musicFiles[firstIndex][1]
                    DownloadsSize = self.__musicFiles[firstIndex][2]
                    DownloadsCategory = self.__musicFiles[firstIndex][3]
                    record = (DownloadsArtist, DownloadsTitle, DownloadsSize, DownloadsCategory)
                    self._Database.query("INSERT INTO YouTubeDownloader.Downloads(DownloadsArtist, DownloadsTitle, DownloadsSize, DownloadsCategory) VALUES (%s, %s, %s, %s)", record)
                    self._Database.execute()
        else:
            for firstIndex in range(0, len(self.__musicFiles), 1):
                for secondIndex in range(0, len(downloads), 1):
                    if self.__musicFiles[firstIndex][0] != downloads[secondIndex][1] and self.__musicFiles[firstIndex][1] != downloads[secondIndex][2]:
                        DownloadsArtist = self.__musicFiles[firstIndex][0]
                        DownloadsTitle = self.__musicFiles[firstIndex][1]
                        DownloadsSize = self.__musicFiles[firstIndex][2]
                        DownloadsCategory = self.__musicFiles[firstIndex][3]
                        record = (DownloadsArtist, DownloadsTitle, DownloadsSize, DownloadsCategory)
                        self._Database.query("INSERT INTO YouTubeDownloader.Downloads(DownloadsArtist, DownloadsTitle, DownloadsSize, DownloadsCategory) VALUES (%s, %s, %s, %s)", record)
                        self._Database.execute()

main = Music()