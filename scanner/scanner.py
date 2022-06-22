from libnmap.process import NmapProcess
from libnmap.parser import NmapParser, NmapParserException


def do_scan(targets, options):
    parsed = None
    nmproc = NmapProcess(targets, options)
    nmproc.run()

    try:
        parsed = NmapParser.parse(nmproc.stdout)
    except NmapParserException as e:
        print("Exception raised while parsing scan: {0}".format(e.msg))

    return parsed
