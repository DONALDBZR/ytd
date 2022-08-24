<?php

/**
 * Downloading YouTube Videos
 */
class YouTube
{
    /**
     * Domain of the application
     */
    public $domain = "http://ytd.local";
    /**
     * Id for the URL
     */
    private $id;
    /**
     * Title of the video
     */
    private $title;
    /**
     * Url of the video
     */
    private $url;
    /**
     * URL's pattern and corresponding object
     */
    private $pattern;
    public function __construct()
    {
        $this->pattern = "/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed)\/))([^\?&\"'>]+)/";
    }
    public function getId()
    {
        return $this->id;
    }
    public function setId($id)
    {
        $this->id = $id;
    }
    public function getTitle()
    {
        return $this->title;
    }
    public function setTitle($title)
    {
        $this->title = $title;
    }
    public function getUrl()
    {
        return $this->url;
    }
    public function setUrl($url)
    {
        $this->url = $url;
    }
    /**
     * Getting the video information
     */
    public function getVideoInfo()
    {
        return file_get_contents("https://www.youtube.com/get_video_info?video_id={$this->extractVideoId($this->getUrl())}&cpn=CouQulsSRICzWn5E&eurl&el=adunit");
    }
    /**
     * Extracting the Video's ID
     */
    public function extractVideoId($url)
    {
        $parsedURL = parse_url($url);
        if ($parsedURL["path"] == "youtube.com/watch") {
            $this->setUrl("https://www.{$url}");
        } else if ($parsedURL["path"] == "www.youtube.com/watch") {
            $this->setUrl("https://{$url}");
        }
        if (isset($parsedURL["query"])) {
            $queryString = $parsedURL["query"];
            parse_str($queryString, $queryArray);
            if (isset($queryArray["v"])) {
                return $queryArray["v"];
            }
        }
    }
    /**
     * Getting the downloader when the pattern matches
     */
    public function getDownloader($url)
    {
        if (preg_match($this->pattern, $url)) {
            return $this;
        }
        return false;
    }
    /**
     * Getting the video's download's link
     */
    public function getVideoDownloadLink()
    {
        parse_str($this->getVideoInfo(), $data);
        $videoData = json_decode($data['player_response'], true);
        $videoDetails = $videoData['videoDetails'];
        $streamingData = $videoData['streamingData'];
        $streamingDataFormats = $streamingData['formats'];
        $this->setTitle($videoDetails["title"]);
        $finalStreamMapArray = array();
        foreach ($streamingDataFormats as $stream) {
            $streamData = $stream;
            $streamData['title'] = $this->getTitle();
            $streamData['mime'] = $streamData['mimeType'];
            $mimeType = explode(";", $streamData['mime']);
            $streamData['mime'] = $mimeType[0];
            $start = stripos($mimeType[0], "/");
            $format = ltrim(substr($mimeType[0], $start), "/");
            $streamData['format'] = $format;
            unset($streamData['mimeType']);
            $finalStreamMapArray[] = $streamData;
            return $finalStreamMapArray;
        }
    }
    /**
     * Validating the url
     */
    public function hasVideo()
    {
        $valid = true;
        parse_str($this->getVideoInfo(), $data);
        if ($data['status'] == "fail") {
            $valid = false;
        }
        return $valid;
    }
    /**
     * Initializing and downloading the video
     */
    public function initialize()
    {
        $JSON = json_decode(file_get_contents("php://input"));
        if (!empty($JSON->videoURL) && !filter_var($JSON->videoURL, FILTER_VALIDATE_URL) == false) {
            $downloader = $this->getDownloader($JSON->videoURL);
            $downloader->setUrl($JSON->videoURL);
            if ($downloader->hasVideo()) {
                $downloadLink = $downloader->getVideoDownloadLink();
                $title = $downloadLink[0]['title'];
                $quality = $downloadLink[0]['qualityLabel'];
                $format = $downloadLink[0]['format'];
                $videoFileName = strtolower(str_replace(' ', '_', $title)) . "." . $format;
                $downloadURL = $downloadLink[0]['url'];
                $fileName = preg_replace('/[^A-Za-z0-9.\_\-]/', '', basename($videoFileName));
                if (!empty($downloadURL)) {
                    header("Cache-Control: public");
                    header("Content-Description: File Transfer");
                    header("Content-Disposition: attachment; filename={$fileName}");
                    header("Content-Type: application/zip");
                    header("Content-Transfer-Encoding: binary");
                    readfile($downloadURL);
                    $JSON = array(
                        "success" => "success",
                        "url" => "{$this->domain}/",
                        "message" => "{$title} has been downloaded."
                    );
                    header('Content-Type: application/json');
                    echo json_encode($JSON);
                }
            } else {
                $JSON = array(
                    "success" => "failure",
                    "url" => "{$this->domain}/",
                    "message" => "The video is not found!  Please check the YouTube URL."
                );
                header('Content-Type: application/json');
                echo json_encode($JSON);
            }
        } else {
            $JSON = array(
                "success" => "failure",
                "url" => "{$this->domain}/",
                "message" => "Please provide a valid YouTube URL."
            );
            header('Content-Type: application/json');
            echo json_encode($JSON);
        }
    }
}
