-- Creating the database
CREATE DATABASE YouTubeDownloader;
-- Creating the Downloads Table
CREATE TABLE YouTubeDownloader.Downloads(
    DownloadsId INT PRIMARY KEY AUTO_INCREMENT,
    DownloadsTitle VARCHAR(128),
    DownloadsLength VARCHAR(8),
    DownloadsDate VARCHAR(32),
    DownloadsCategory VARCHAR(8)
);