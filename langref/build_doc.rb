### Documentation builder for JLisp

require "maruku"

TEMPLATE = <<E
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="./style.css"></link>
        <title>#title</title>
    </head>
    <body>
        <!-- table formatting ftw -->
        <table>
            <tr>
                <td id="navbar">#navbar</nav>
                <td id="body">#body</div>
            </tr>
        </table>
    </body>
</html>
E
STYLE = <<E
body {
    font-family: sans-serif;
}
#navbar {
    padding-right: 10px;
    border-right: 2px solid black;
}
#body {
    padding-left: 30px;
}
a {
    color: black;
    text-decoration: underline;
}
a:hover {
    color: blue;
}
h1 {
    padding-bottom: 2px;
    border-bottom: 1px solid #CCC;
    margin-bottom: 5px;
}
E

File.write "bin/style.css", STYLE

FILES = %w{src/index.md src/Syntax.md src/Operators.md src/Stdlib.md}

NAV = {}
RENDERED = {}

FILES.each do |l|
    md = File.read l
    title = md.match(/^# (.+)/)[1]
    NAV[title] = File.basename(l, ".*") + ".html"
    puts "Building #{l}..."
    tmp = TEMPLATE
    tmp = tmp.sub "#title", title
    tmp = tmp.sub "#body", Maruku.new(md).to_html
    RENDERED[File.basename(l, ".*") + ".html"] = tmp
end

navs = ""

NAV.each do |k, v|
    navs += %{<a href="#{v}">#{k}</a><br />}
end

RENDERED.each do |k, v|
    File.write File.join("bin", k), v.sub("#navbar", navs)
end
puts "Documentation builded"
