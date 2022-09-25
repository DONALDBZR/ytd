# Importing the you tube downloader
from YouTube import YTD
# Instantiating the youtube downloader
YouTubeDownloader = YTD()
YouTubeDownloader.setLink(str(input("Enter the link of the video: ")))
YouTubeDownloader.setCategory(str(input("Enter the category of the video: ")))
YouTubeDownloader.verifyTitle()